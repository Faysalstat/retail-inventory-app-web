import { Component, OnInit } from '@angular/core';
import { ReportServiceService } from '../../services/report-service.service';
import { NotificationService } from '../../services/notification-service.service';
import { ExcelExportService } from '../../services/excel-export.service';
import { AuthService } from '../../services/authService';

@Component({
  selector: 'app-cash-collection-report',
  templateUrl: './cash-collection-report.component.html',
  styleUrls: ['./cash-collection-report.component.css']
})
export class CashCollectionReportComponent implements OnInit {
  offset = 0;
  length = 1000;
  pageSize = 500;
  pageSizeOptions: number[] = [100,500,1000];
  transactionList:any[] = [];
  transactionListExportable:any[] = [];
  query!: any;
  totalDebit = 0;
  totalCredit = 0;
  userList!:any[];
  constructor(
    private reportService: ReportServiceService,
    private notificationService:NotificationService,
    private excelExportServie :ExcelExportService,
    private authService:AuthService
  ) { 
    this.query = {
      issuedBy:"",
      fromDate: new Date('1/1/2023'),
      toDate: new Date(),
    };
    this.userList = [];
    
  }

  ngOnInit(): void {
    this.fetchCashCollectionRecordByUser();
    this.fetchUserList();
  }
  fetchUserList(){
    this.userList = [];
    this.authService.getAllUser('').subscribe({
      next:(res)=>{
        let users = res.body;
        users.map((user:any)=>{
          this.userList.push({label:user.person.personName,value:user.person.personName})
        })
      },
      error:(err)=>{
        this.notificationService.showErrorMessage("ERROR",err.message,"OK",300);
      }
    })
  }
  fetchCashCollectionRecordByUser(){
    const params: Map<string, any> = new Map();
    params.set('offset',this.offset);
    params.set('limit',this.pageSize);
    params.set('fromDate',this.query.fromDate);
    params.set('toDate',this.query.toDate);
    params.set('issuedBy',this.query.issuedBy);
    this.reportService.fetchCashCollectionRecordByUser(params).subscribe({
      next:(res)=>{
        this.totalDebit = 0;
        this.totalCredit = 0;
        this.transactionListExportable = [];
        this.transactionList= res.body.data;
        this.length = res.body.size;
        this.transactionList.map((elem)=>{
          let item = {
            TNX_TYPE:elem.transactionType,
            TNX_REASON:elem.transactionReason,
            DEBIT: elem.isDebit==1?elem.amount:0,
            CREDIT: elem.isDebit==0?elem.amount:0,
            TNX_DATE:elem.transactionDate,
            REMARK:elem.refference,
          };
          this.transactionListExportable.push(item);
          this.totalDebit += (elem.isDebit==1?elem.amount:0);
          this.totalCredit += (elem.isDebit==0?elem.amount:0);
        })
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }
  exportAsExcel(){
      this.excelExportServie.exportAsExcelFile(this.transactionListExportable,"Tnx-Report");
  }
  pageChange(event:any){
    this.pageSize = event.pageSize;
    this.offset = this.pageSize * event.pageIndex;
    this.fetchCashCollectionRecordByUser();
  }
}
