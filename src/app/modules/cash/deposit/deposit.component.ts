import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NotificationService } from '../../services/notification-service.service';
import { TransactionService } from '../../services/transaction.service';
import { InventoryService } from '../../services/inventory.service';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { COFIGS, Tasks } from '../../model/models';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  @Output() depositEvent = new EventEmitter<string>();
  depositAmount!: number;
  receivedFrom!: string;
  clients!:any;
  receivedDate: Date= new Date();
  issueDate!: Date ;
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
  submit() {
    
    if (!this.depositAmount) {
      this.notificationService.showErrorMessage(
        'INVALID',
        'Input All Data',
        'OK',
        1000
      );
      return;
    }
    this.isSubmitted = true;
    let depositModel = {
      transactionType: "DEPOSIT",
      cashAmount: this.depositAmount,
      receivedFrom:this.receivedFrom,
      comment: this.comment,
      issuedBy: localStorage.getItem("username"),
      issueDate: this.issueDate,
      paymentMethod : this.paymentMethod
    };
    if (this.isApprovalNeeded) {
      let approvalModel = {
        payload: JSON.stringify(depositModel),
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
            1000
          );
          this.route.navigate(['/cash/transaction-list']);
        },
        error: (err) => {
          this.notificationService.showMessage(
            'Failed!',
            'Approval Sending Failed. ' + err.message,
            'OK',
            1000
          );
        },
      });
    } else {
      const params: Map<string, any> = new Map();
      params.set('depositModel', depositModel);
      this.transactionService.doDeposit(params).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.isSubmitted = false;
            this.depositAmount = 0;
            this.comment = '';
            this.paymentMethod = 'CASH'
            this.depositEvent.emit('Balance Changed');
            this.notificationService.showMessage(
              'Success!',
              'Deposit Complete',
              'OK',
              1000
            );
          } else {
            this.notificationService.showErrorMessage(
              'ERROR!',
              res.message,
              'OK',
              1000
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
