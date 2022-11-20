import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Account, Customer } from '../../model/models';
import { ClientService } from '../../services/client.service';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  @Output() customerAddedEvent = new EventEmitter<string>();
  clientForm!: FormGroup;
  
  customer: Customer = new Customer();
  account: Account = new Account();
  errMsg: string = '';
  isCustomerExist: boolean = false;
  constructor(
    private formBuilder:FormBuilder,
    private clientService: ClientService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.prepareForm();
  }
  prepareForm() {
    this.clientForm = this.formBuilder.group({
      id: [''],
      name: [''],
      shopName:[''],
      contactNo: [''],
      address: [''],
      balance:[0],
    });
  }
  searchCustomer() {
    let contactNo = this.clientForm.get('contactNo')?.value;
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
  addClient() {
    if(this.clientForm.invalid){
      return;
    }
    const params: Map<string, any> = new Map();
    let supplyerModel = this.clientForm.value;
    params.set('client', supplyerModel);
    this.clientService.addClient(params).subscribe({
      next: (res) => {
        if (res.body) {
          this.isCustomerExist = true;
          this.clientForm.get('id')?.setValue(res.body.id);
          console.log(res.body);
        }
        this.notificationService.showMessage(
          'SUCCESS!',
          'Client Add Successful',
          'OK',
          1000
        );
      },
    });
  }

}
