import { Component, OnInit } from '@angular/core';
import { Customer, Person, Supplyer } from '../../model/models';
import { ClientService } from '../../services/client.service';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-cash-receive',
  templateUrl: './cash-receive.component.html',
  styleUrls: ['./cash-receive.component.css']
})
export class CashReceiveComponent implements OnInit {
  customer: Customer = new Customer();
  person: Person = new Person();
  color:string ="black";
  errMsg: string = ""
  constructor(
    private clientService:ClientService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
  }
  searchCustomer() {
    this.clientService.getClientByContactNo(this.person.contactNo).subscribe({
      next: (res) => {
        if (res.body) {
          this.notificationService.showMessage(
            'SUCCESS!',
            'Person Found',
            'OK',
            2000
          );
          this.person = res.body;
          console.log(res.body);
          if (res.body.customer) {
            this.customer = res.body.customer;
            if (this.customer.account.balance < 0) {
              this.color = 'red';
            } else {
              this.color = 'black';
            }
            
          } else {
            this.errMsg =
              '** This person is not a Customer, Please Add as a Customer';
          }
        } else {
          return;
        }
      },
      error: (err) => {
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
