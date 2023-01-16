import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account, Customer, Person } from '../../model/models';
import { ClientService } from '../../services/client.service';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
  client!: any;
  person: Person = new Person();
  account: Account = new Account();
  accountHistory: any[] = [];
  customer: any = {};
  showAccountHistory: boolean = false;
  queryBody:any = {};
  tnxTypes:any[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private notificationService: NotificationService
  ) {
    this.tnxTypes = [
      {label:"Select Tnx Type", value:''},
      {label:"Debit", value:"DEBIT"},
      {label:"Credit", value:"CREDIT"},
    ]
    this.queryBody={
      accountId:"",
      tnxType:"",
      fromDate: new Date('1/1/2023'),
      toDate: new Date(),
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      let id = parameter['id'];
      this.fetchAccountDetailsById(id);
    });
  }
  fetchAccountDetailsById(id: any) {
    const params: Map<string, any> = new Map();
    params.set('id', id);
    this.clientService.getPersonById(id).subscribe({
      next: (res) => {
        this.person = res.body;
        if (res.body.customer) {
          this.customer = res.body.customer;
          this.account = res.body.customer.account;
          this.queryBody.accountId = this.account.id;
        }
      },
    });
  }
  showHistory(event: boolean) {
    this.showAccountHistory = event;
  }
  updateCustomer(){
    const params: Map<string, any> = new Map();
    let customerModel = {
      clientType : "CUSTOMER",
      personName: this.person.personName,
      personAddress: this.person.personAddress,
      personId: this.person.id,
      email: this.person.email,
      customerId: this.customer.id,
      shopName:this.customer.shopName,
      shopAddress:this.customer.shopAddress,
    }
    params.set("client",customerModel);
    this.clientService.updateClient(params).subscribe({
      next:(res)=>{
        if(res.isSuccess){
          this.notificationService.showMessage("SUCCESS",res.message,"OK",300);
        }else{
          this.notificationService.showErrorMessage("ERROR",res.message,"OK",300);
        }
      },
      error:(err)=>{
        this.notificationService.showErrorMessage("ERROR",err.message,"OK",300);
      }
    })
    
  }
  fetchAccountHistory(){
    const params: Map<string, any> = new Map();
    params.set("fromDate",this.queryBody.fromDate);
    params.set("toDate",this.queryBody.toDate);
    params.set("tnxType",this.queryBody.tnxType);
    params.set("accountId",this.queryBody.accountId);

    this.clientService.getAccountHistoryListByAccountId(params).subscribe({
      next:(res)=>{
        if(res.isSuccess){
          this.accountHistory = res.body;
        }else{
          this.notificationService.showErrorMessage("ERROR",res.message,"OK",200);
        }
      }
    })
  }
}
