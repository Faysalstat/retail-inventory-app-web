import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { COFIGS, Tasks } from '../../model/models';
import { InventoryService } from '../../services/inventory.service';
import { NotificationService } from '../../services/notification-service.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-add-loan-details',
  templateUrl: './add-loan-details.component.html',
  styleUrls: ['./add-loan-details.component.css']
})
export class AddLoanDetailsComponent implements OnInit {
  @Output() loanEvent = new EventEmitter<string>();
  depositAmount!: number;
  loanCategory: string='BANK_LOAN';
  receivedFrom: string='';
  receivedDate: Date= new Date();
  paymentMethod: string='CASH';
  interestRate: number = 0;
  comment!: String;
  types: any[];
  paymentMethods: any[];
  userName: any;
  isApprovalNeeded: boolean = false;
  isSubmitted: boolean = false;
  showLoader = false;
  constructor(
    private notificationService: NotificationService,
    private transactionService: TransactionService,
    private inventoryService: InventoryService,
    private route:Router
  ) {
    this.types = [
      { label: 'Select Deposit Type', value: '' },
      { label: 'Director Investment', value: 'DIRECTOR_INVESTMENT' },
      { label: 'Loan', value: 'LOAN' },
      { label: 'Bank', value: 'BANK' },
      { label: 'Other', value: 'OTHER' },
    ];
    this.paymentMethods = [
      { label: 'Select Payment Method', value: '' },
      { label: 'CASH', value: 'CASH' },
      { label: 'BANK', value: 'BANK' },
      { label: 'BKASH', value: 'BKASH' },
      
    ];
  }
  ngOnInit(): void {
    this.userName = localStorage.getItem('username');
    this.fetchDepositTypes();
    this.getConfig(COFIGS.TRANSACTION_APPROVAL_NEEDED);
  }
  getConfig(configname: any) {
    this.inventoryService.getConfigByName(configname).subscribe({
      next: (res) => {
        if (res.body && res.body.value == 1) {
          this.isApprovalNeeded = true;
        } else {
          this.isApprovalNeeded = false;
        }
      },
    });
  }
  fetchDepositTypes() {}
  submit() {
    this.isSubmitted = true;
    if (!this.loanCategory || this.receivedFrom == '' || !this.depositAmount) {
      this.notificationService.showErrorMessage(
        'INVALID',
        'Input All Data',
        'OK',
        200
      );
      return;
    }
    let expenseModel = {
      transactionReason: this.loanCategory,
      loanCategory: this.loanCategory,
      paymentMethod: this.paymentMethod,
      cashAmount: this.depositAmount,
      receivedBy: 'INVENTORY_GL',
      receivedFrom : this.receivedFrom,
      comment: this.comment,
      transactionType: 'LOAN',
      issuedBy: localStorage.getItem("username"),
      interestRate: this.interestRate || 0,
      tnxDate: this.receivedDate
    };
    if (this.isApprovalNeeded) {
      let approvalModel = {
        payload: JSON.stringify(expenseModel),
        createdBy: this.userName,
        taskType: Tasks.DEPOSIT_TRANSACTION,
        status: 'OPEN',
      };
      const params: Map<string, any> = new Map();
      params.set('approval', approvalModel);
      this.inventoryService.sendToApproval(params).subscribe({
        next: (res) => {
          this.notificationService.showMessage(
            'SUCCESS!',
            'Approval Sent',
            'OK',
            500
          );
          this.route.navigate(['/cash/transaction-list']);
        },
        error: (err) => {
          this.notificationService.showMessage(
            'Failed!',
            'Approval Sending Failed. ' + err.message,
            'OK',
            500
          );
        },
      });
    } else {
      const params: Map<string, any> = new Map();
      params.set('expenseModel', expenseModel);
      this.transactionService.doExpense(params).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.isSubmitted = false;
            this.depositAmount = 0;
            this.receivedFrom = '';
            this.loanCategory = 'BANK_LOAN';
            this.comment = '';
            this.paymentMethod = 'CASH'
            this.interestRate = 0;
            this.loanEvent.emit('Balance Changed');
            this.notificationService.showMessage(
              'Success!',
              'Payment Complete',
              'OK',
              500
            );
          } else {
            this.notificationService.showErrorMessage(
              'ERROR!',
              res.message,
              'OK',
              500
            );
          }
        },
        error: (err) => {
          this.isSubmitted = false;
          console.log(err.message);
          this.notificationService.showErrorMessage(
            'ERROR!',
            'Operation Failed' + err.message,
            'OK',
            2000
          );
        },
      });
    }
  }
}
