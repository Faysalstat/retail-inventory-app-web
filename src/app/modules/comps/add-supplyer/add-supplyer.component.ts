import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account, Customer } from '../../model/models';
import { ClientService } from '../../services/client.service';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-add-supplyer',
  templateUrl: './add-supplyer.component.html',
  styleUrls: ['./add-supplyer.component.css']
})
export class AddSupplyerComponent implements OnInit {
  SupplyerAddingForm!:FormGroup;
  customer!: Customer;
  account:Account = new Account();
  //account!:any;
  //code!:string;
  companyName!: string;
  brand!: string;
  shopName!: string;
  code!:string; 
  regNo!:string;  
  isCustomerExist: boolean = false;
  showLoader:boolean = false;  
  errMsg: string = '';
  constructor(
    private formBuilder:FormBuilder,
    private clientService: ClientService,
    private notificationService: NotificationService
    
    ) { 
      this.customer=new Customer();
    }

  ngOnInit(): void {
    this.prepareForm();
    
  }

  prepareForm() {
    this.SupplyerAddingForm = this.formBuilder.group({
      companyName: ['',[Validators.required]],
      shopName: [''],
      code:['',[Validators.required]],
      regNo:[''],
      brandName:[''],
      contactNo:[''],
      website:[''],
      //personName:this.customer.person.personName??'',
     // personAddress: [''], //this.customer.person.personAddress??''
    });
  }
  

addSupplyer(){

  if (this.SupplyerAddingForm.invalid) {
    return;
  }
  this.showLoader = true;
  let supplyerModel = this.SupplyerAddingForm.value;
  const params:Map<string,any> = new Map();
  params.set("SUPPLYER",supplyerModel);
  console.log(supplyerModel);
  this.clientService.addClient(params).subscribe({

      // this.supplyerModel.type="",

    next:(res)=>{
      this.SupplyerAddingForm.reset();
      this.notificationService.showMessage("SUCCESS!","Supplyer Add Successful","OK",1000);
    },
    error:(err)=>{
      this.notificationService.showMessage("FAILED!","Supplyer Add Failed","OK",1000);
    },
    complete:()=>{
      this.showLoader = false;
    }
  })
}

searchCustomer() {
  let contactNo = this.SupplyerAddingForm.get('contactNo')?.value;
  this.customer.person.personAddress = 'Address init';
  // this.SupplyerAddingForm.controls['personName'].setValue('Hasan')
  // this.SupplyerAddingForm.controls['personAddress'].setValue('personAddress')
  // console.log(this.SupplyerAddingForm)
  
  this.clientService.getClientByContactNo(contactNo).subscribe({
    next: (res) => {
      if (res.body) {
        this.notificationService.showMessage(
          'SUCCESS!',
          'Person Found',
          'OK',
          2000
        );
        if (res.body.customer) {
          this.customer = res.body.customer;
          this.isCustomerExist = true;
        } else {
          this.errMsg =
            '** This person is not a Customer, Please Add as a Customer';
          this.isCustomerExist = false;
        }
      } else {
        this.customer.person.personAddress = '';
        this.customer.person.personName = '';
        this.customer.person.id = 0;
        this.isCustomerExist = false;
        return;
      }
    },
    error: (err) => {
      this.isCustomerExist = false;
      console.log(err.message);
      this.notificationService.showMessage(
        'ERROR!',
        'Customer Found Failed' + err.message,
        'OK',
        2000
      );
    },
    complete: () => {},
  });
}
  
}
