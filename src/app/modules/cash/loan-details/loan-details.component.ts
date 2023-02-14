import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../services/notification-service.service';
import { ReportServiceService } from '../../services/report-service.service';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css'],
})
export class LoanDetailsComponent implements OnInit {
  loanId!: any;
  loanAccount!: any;
  comment: string = '';
  showAccountHistory: boolean = false;
  showInstallmentPanel: boolean = false;
  accountistory: any[] = [];
  installmentModel: any = {};
  paymentMethods: any[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private reportService: ReportServiceService
  ) {
    this.installmentModel = {
      installMentAmount: 0,
      interestAmount: 0,
      payingDate: new Date(),
      paymentMethod: 'CASH',
      loanAccount: this.loanAccount,
    };
    this.paymentMethods = [
      { label: 'Select Payment Method', value: '' },
      { label: 'CASH', value: 'CASH' },
      { label: 'BANK', value: 'BANK' },
      { label: 'BKASH', value: 'BKASH' },
    ];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      let id = parameter['id'];
      this.fetchDetailsBID(id);
    });
  }
  fetchDetailsBID(id: any) {
    this.reportService.fetchLoanDetails(id).subscribe({
      next: (res) => {
        console.log(res.body);
        this.loanAccount = res.body;
        this.comment = this.loanAccount.remark;
        this.accountistory = this.loanAccount.account.accountHistories;
      },
    });
  }
  showHistory(event: boolean) {
    this.showAccountHistory = event;
    this.showInstallmentPanel = false;
  }
  showInstallment(event: boolean) {
    this.showAccountHistory = false;
    this.showInstallmentPanel = event;
  }
  payInstallment() {
    this.notificationService.showMessage(
      'WARNING',
      'NOT IMPLEMENTED YET.',
      'OK',
      1000
    );
  }
}
