import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Account, Customer, Person, Supplyer } from '../../model/models';
import { ClientService } from '../../services/client.service';
import { InventoryService } from '../../services/inventory.service';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-cash-transaction',
  templateUrl: './cash-transaction.component.html',
  styleUrls: ['./cash-transaction.component.css'],
})
export class CashTransactionComponent implements OnInit {
  types: any[] = [];
  cashTransactionForm!: FormGroup;
  isSupplier: boolean = false;
  isCustomer: boolean = false;
  selectedType: string = 'PAYMENT';
  contactNo: string = "";
  code:string = '';
  person:Person = new Person();
  account: Account = new Account();
  customer: Customer = new Customer();
  supplier: Supplyer = new Supplyer();
  isClientFound: boolean = false;
  comment: string = "";
  paymentMethods: any [];
  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private clientService: ClientService,
    private inventoryService: InventoryService
  ) {
    this.types = [
      { value: 'PAYMENT', label: 'Payment' },
      { value: 'RECEIVE', label: 'Receive' },
    ];
    this.paymentMethods = [
      // {label:"Select Payment Method", value:null},
      {label:"BANK", value:"BANK"},
      {label:"BKASH", value:"BKASH"},
      {label:"CASH", value:"CASH"},
    ]
  }

  ngOnInit(): void {
    this.prepareForm();
  }
  prepareForm() {
    this.cashTransactionForm = this.formBuilder.group({
      transactionType: [''],
      clientType: [''],
      accountId: [''],
      cashAmount: [''],
      paymentMethod: ["BANK"]
    });
  }
  onClientTypeChange() {
    if (this.selectedType == 'CUSTOMER') {
      this.isCustomer = true;
      this.isSupplier = false;
      
    } else if (this.selectedType == 'SUPPLIER') {
      this.isCustomer = false;
      this.isSupplier = true;
    }
    this.cashTransactionForm.get('clientType')?.setValue(this.selectedType);
  }
  searchCustomer() {
    const params: Map<string, any> = new Map();
    if (this.selectedType == 'CUSTOMER') {
     
      this.clientService.getClientByContactNo(this.contactNo).subscribe({
        next:(res)=>{
          console.log(res.body);
          if(res.body){
            this.person = res.body;
            if(res.body.customer){
              this.customer = res.body.customer;
              this.account = res.body.customer.account;
              this.cashTransactionForm.get('accountId')?.setValue(this.account.id);
              this.isClientFound = true;
            }else{
              this.notificationService.showMessage("NOT FOUND","This Person Not a Customer","OK",200);
            }
          }else{
            this.notificationService.showMessage("NOT FOUND","This Contact Not in Our database","OK",200);
          }
          
        },
        error:(err)=>{
          this.notificationService.showMessage("ERROR","Error Happend "+ err.message,"OK",200);
          this.isClientFound = false;
        }
      })
    }else if (this.selectedType == 'SUPPLIER') {
      params.set("id","");
      params.set('code',this.code);
      this.clientService.getSupplyerByCode(params).subscribe({
        next:(res)=>{
          console.log(res.body);
          if(res.body){
            this.supplier = res.body;
            this.person = res.body.person;
            this.account = res.body.account;
            this.cashTransactionForm.get('accountId')?.setValue(this.account.id);
            this.isClientFound = true;
          }else{
            this.notificationService.showMessage("NOT FOUND","This Code Not in Our database","OK",200);
          }
        },
        error:(err)=>{
          this.isClientFound = false;
          this.notificationService.showMessage("ERROR","Error Happend "+ err.message,"OK",200);
        }
      })
    }
    
  }

  submitTransaction(){
    let transactionModel = this.cashTransactionForm.value;
    transactionModel.issuedBy = "MANAGER";
    transactionModel.comment = this.comment;
    console.log(transactionModel);
    const params: Map<string, any> = new Map();
    params.set("payment",transactionModel);
    this.inventoryService.doPaymentTransaction(params).subscribe({
      next:(res)=>{
        this.notificationService.showMessage("SUCCESS!","Payment Successful","OK",400);
        this.cashTransactionForm.reset();
        this.isSupplier = false;
        this.isCustomer = false;
        this.isClientFound = false;
      },
      error:(err)=>{
        this.notificationService.showMessage("ERROR!","Payment FAILED","OK",200);
      }
    })
  }
}
