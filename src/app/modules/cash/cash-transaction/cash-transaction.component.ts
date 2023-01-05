import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Account, Customer, Person, Supplyer, Tasks } from '../../model/models';
import { ClientService } from '../../services/client.service';
import { InventoryService } from '../../services/inventory.service';
import { NotificationService } from '../../services/notification-service.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-cash-transaction',
  templateUrl: './cash-transaction.component.html',
  styleUrls: ['./cash-transaction.component.css'],
})
export class CashTransactionComponent implements OnInit {
  types: any[] = [];
  cashTransactionForm!: FormGroup;
  isSupplier: boolean = true;
  isCustomer: boolean = false;
  selectedType: string = 'SUPPLIER';
  contactNo: string = '';
  code: string = '';
  person: Person = new Person();
  account: Account = new Account();
  customer: Customer = new Customer();
  supplier: Supplyer = new Supplyer();
  isClientFound: boolean = false;
  comment: string = '';
  paymentMethods: any[];
  transactionReasons!: any[];
  isTnxDone: boolean = false;
  isApprovalNeeded: boolean = true;
  userName: string = 'MANAGER';
  isReturn: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private clientService: ClientService,
    private inventoryService: InventoryService,
    private transactionService: TransactionService,
    private route: Router
  ) {
    this.types = [
      { value: 'PAYMENT', label: 'Payment' },
      { value: 'RECEIVE', label: 'Receive' },
    ];
    this.paymentMethods = [
      // {label:"Select Payment Method", value:null},
      { label: 'BANK', value: 'BANK' },
      { label: 'BKASH', value: 'BKASH' },
      { label: 'CASH', value: 'CASH' },
    ];
  }

  ngOnInit(): void {
    this.prepareForm();
    this.fetchTransactionReasons();
  }
  prepareForm() {
    this.cashTransactionForm = this.formBuilder.group({
      transactionType: ['PAYMENT'],
      transactionReason: [''],
      clientType: ['SUPPLIER'],
      accountId: [''],
      cashAmount: [''],
      paymentMethod: ['BANK'],
      isReturn: [false],
    });
  }
  onClientTypeChange() {
    if (this.selectedType == 'CUSTOMER') {
      this.isCustomer = true;
      this.isSupplier = false;
      this.cashTransactionForm.get('transactionType')?.setValue('RECEIVE');
    } else if (this.selectedType == 'SUPPLIER') {
      this.isCustomer = false;
      this.isSupplier = true;
      this.cashTransactionForm.get('transactionType')?.setValue('PAYMENT');
    }
    this.cashTransactionForm.get('clientType')?.setValue(this.selectedType);
  }
  searchCustomer() {
    const params: Map<string, any> = new Map();
    if (this.selectedType == 'CUSTOMER') {
      this.clientService.getClientByContactNo(this.contactNo).subscribe({
        next: (res) => {
          console.log(res.body);
          if (res.body) {
            this.person = res.body;
            if (res.body.customer) {
              this.customer = res.body.customer;
              this.account = res.body.customer.account;
              this.cashTransactionForm
                .get('accountId')
                ?.setValue(this.account.id);
              this.isClientFound = true;
            } else {
              this.notificationService.showMessage(
                'NOT FOUND',
                'This Person Not a Customer',
                'OK',
                200
              );
            }
          } else {
            this.notificationService.showMessage(
              'NOT FOUND',
              'This Contact Not in Our database',
              'OK',
              200
            );
          }
        },
        error: (err) => {
          this.notificationService.showMessage(
            'ERROR',
            'Error Happend ' + err.message,
            'OK',
            200
          );
          this.isClientFound = false;
        },
      });
    } else if (this.selectedType == 'SUPPLIER') {
      params.set('id', '');
      params.set('code', this.code);
      this.clientService.getSupplyerByCode(params).subscribe({
        next: (res) => {
          console.log(res.body);
          if (res.body) {
            this.supplier = res.body;
            this.person = res.body.person;
            this.account = res.body.account;
            this.cashTransactionForm
              .get('accountId')
              ?.setValue(this.account.id);
            this.isClientFound = true;
          } else {
            this.notificationService.showMessage(
              'NOT FOUND',
              'This Code Not in Our database',
              'OK',
              200
            );
          }
        },
        error: (err) => {
          this.isClientFound = false;
          this.notificationService.showMessage(
            'ERROR',
            'Error Happend ' + err.message,
            'OK',
            200
          );
        },
      });
    }
  }

  submitTransaction() {
    let transactionModel = this.cashTransactionForm.value;
    transactionModel.issuedBy = 'MANAGER';
    transactionModel.comment = this.comment;
    transactionModel.person = this.person;
    transactionModel.account = this.account;
    console.log(transactionModel);

    if (this.isApprovalNeeded) {
      let approvalModel = {
        payload: JSON.stringify(transactionModel),
        createdBy: this.userName,
        taskType: Tasks.TRANSACTION,
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
      params.set('payment', transactionModel);
      this.inventoryService.doPaymentTransaction(params).subscribe({
        next: (res) => {
          console.log(res.body);
          this.notificationService.showMessage(
            'SUCCESS!',
            'Payment Successful',
            'OK',
            400
          );
          this.cashTransactionForm.reset();
          this.comment = '';
          this.account = res.body;
        },
        error: (err) => {
          this.notificationService.showMessage(
            'ERROR!',
            'Payment FAILED',
            'OK',
            200
          );
          this.isTnxDone = false;
        },
      });
    }
  }

  fetchTransactionReasons() {
    this.transactionReasons = [
      { label: 'Select Transaction Reasons', value: '' },
    ];
    this.transactionService.fetchAllTransactionReason().subscribe({
      next: (res) => {
        if (res.body) {
          let reasons = res.body;
          reasons.map((elem: any) => {
            let option = { label: elem.key, value: elem.value };
            this.transactionReasons.push(option);
          });
        }
      },
    });
  }

  onChangeIsReturn(ev: any) {
    this.isReturn = ev.checked ? true : false;
    if(this.isReturn){
      this.cashTransactionForm.get('transactionType')?.setValue('RETURN');
    }else if(this.isCustomer){
      this.cashTransactionForm.get('transactionType')?.setValue('RECEIVE');
    }else{
      this.cashTransactionForm.get('transactionType')?.setValue('PAYMENT');
    }
    
  }
}
