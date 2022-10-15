import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer, Person } from '../../model/models';
import { ClientService } from '../../services/client.service';
import { NotificationService } from '../../services/notification-service.service';
@Component({
  selector: 'app-sale-point',
  templateUrl: './sale-point.component.html',
  styleUrls: ['./sale-point.component.css']
})
export class SalePointComponent implements OnInit {
  saleInvoiceIssueForm!: FormGroup;
  isEdit:boolean = false;
  isCustomerExist:boolean = false;
  customer!:Customer;
  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private notificationService: NotificationService
  ) {
    this.customer = new Customer();
    this.customer.person = new Person();
   }

  ngOnInit(): void {
  }
  prepareInvoiceIssueForm(){
    this.saleInvoiceIssueForm = this.formBuilder.group({
      id:[''],
      customerId:[''],
      orders: [[],[Validators.required]],
      
    });
  }
  searchCustomer(){
    this.clientService.getClientByContactNo(this.customer.person.contactNo).subscribe({
      next:(res)=>{
        if(res.body){
          console.log(res.body);
          this.customer = res.body;
          this.notificationService.showMessage("SUCCESS!","Customer Exists","OK",1000);
        }
        
      }
    })
  }
  addCustomer(){
    const params: Map<string, any> = new Map();
    let customerModel = {
      clientType: "CUSTOMER",
      personName: this.customer.person.personName,
      contactNo: this.customer.person.contactNo,
      personAddress: this.customer.person.personAddress,
      shopName: this.customer.shopName
    }
    params.set("client",customerModel);

    this.clientService.addClient(params).subscribe({
      next:(res)=>{
        if(res.body){
          this.saleInvoiceIssueForm.get('customerId')?.setValue(res.body.id);
          console.log(res.body);
        }
        this.notificationService.showMessage("SUCCESS!","Product Add Successful","OK",1000);
      }
    })
    
  }

}
