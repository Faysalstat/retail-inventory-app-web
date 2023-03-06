import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account, Person } from '../../model/models';
import { ClientService } from '../../services/client.service';
import { ExcelExportService } from '../../services/excel-export.service';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  client!: any;
  person: Person = new Person();
  account: Account = new Account();
  accountHistory: any[] = [];
  accountHistoryExportable: any[] = [];
  employee: any = {};
  showAccountHistory: boolean = false;
  queryBody: any = {};
  tnxTypes: any[];
  showLoader:boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private notificationService: NotificationService,
    private excelExportService: ExcelExportService
  ) {
    this.tnxTypes = [
      { label: 'All', value: '' },
      { label: 'Debit', value: 'DEBIT' },
      { label: 'Credit', value: 'CREDIT' },
    ];
    this.queryBody = {
      accountId: '',
      tnxType: '',
      fromDate: new Date('1/1/2023'),
      toDate: new Date(),
    };
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      let id = parameter['id'];
      this.fetchAccountDetailsById(id);
    });
  }
  fetchAccountDetailsById(id: any) {
    this.showLoader = true;
    const params: Map<string, any> = new Map();
    params.set('id', id);
    this.clientService.getPersonById(id).subscribe({
      next: (res) => {
        this.person = res.body;
        if (res.body.employee) {
          this.employee = res.body.employee;
          this.account = res.body.employee.account;
          this.queryBody.accountId = this.account.id;
        }
      },
      error:(err)=>{
        this.notificationService.showNotFoundErrorMessage("Person",200);
      },
      complete:()=>{
        this.showLoader = false;
      }
    });
  }
  showHistory(event: boolean) {
    this.showAccountHistory = event;
    this.fetchAccountHistory();
  }
  updateEmployee() {
    const params: Map<string, any> = new Map();
    let employeeModel = {
      clientType: 'EMPLOYEE',
      personName: this.person.personName,
      personAddress: this.person.personAddress,
      personId: this.person.id,
      email: this.person.email,
      designation: this.employee.designation,
      role: this.employee.role,
    };
    params.set('client', employeeModel);
    this.clientService.updateClient(params).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.notificationService.showMessage(
            'SUCCESS',
            res.message,
            'OK',
            300
          );
        } else {
          this.notificationService.showErrorMessage(
            'ERROR',
            res.message,
            'OK',
            300
          );
        }
      },
      error: (err) => {
        this.notificationService.showErrorMessage(
          'ERROR',
          err.message,
          'OK',
          300
        );
      },
    });
  }
  fetchAccountHistory() {
    const params: Map<string, any> = new Map();
    params.set('fromDate', this.queryBody.fromDate);
    params.set('toDate', this.queryBody.toDate);
    params.set('tnxType', this.queryBody.tnxType);
    params.set('accountId', this.queryBody.accountId);

    this.clientService.getAccountHistoryListByAccountId(params).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.accountHistory = res.body;
          this.accountHistoryExportable = [];
          let sn = 0;
          this.accountHistory.map((elem) => {
            let item = {
              SN: sn + 1,
              TNX_DATE: elem.tnxDate,
              PAYMENT_METHOD: elem.paymentMethod,
              DEBIT: elem.tnxType=="DEBIT"?elem.tnxAmount:0,
              CREDIT: elem.tnxType=="CREDIT"?elem.tnxAmount:0,
              COMMENT: elem.remark,
            };
            this.accountHistoryExportable.push(item);
          });
        } else {
          this.notificationService.showErrorMessage(
            'ERROR',
            res.message,
            'OK',
            200
          );
        }
      },
    });
  }
  export() {
    this.excelExportService.exportAsExcelFile(
      this.accountHistoryExportable,
      'ACCOUNT_STATEMENT'
    );
  }
}
