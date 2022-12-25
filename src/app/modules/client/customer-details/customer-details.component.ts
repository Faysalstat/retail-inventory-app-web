import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account, Customer, Person } from '../../model/models';
import { ClientService } from '../../services/client.service';

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
  customer: Customer = new Customer();
  showAccountHistory: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService
  ) {}

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

        console.log(res.body);
        if (res.body.customer) {
          this.customer = res.body.customer;
          this.account = res.body.customer.account;
          this.accountHistory = res.body.customer.account.accountHistories;
        }
      },
    });
  }
  showHistory(event: boolean) {
    this.showAccountHistory = event;
  }
}
