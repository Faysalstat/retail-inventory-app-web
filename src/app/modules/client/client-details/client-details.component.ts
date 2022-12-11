import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account, Customer, Person, Supplyer } from '../../model/models';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  client!:any;
  person:Person = new Person();
  account:Account = new Account();
  customer: Customer = new Customer();
  supplyer:Supplyer = new Supplyer();
  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService:ClientService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      let id = parameter['id'];
      this.fetchAccountDetailsById(id);
    })
  }
  fetchAccountDetailsById(id:any){
    const params: Map<string, any> = new Map();
    params.set('id',id);
    this.clientService.getPersonById(id).subscribe({
      next:(res)=>{
        this.person = res.body;
        if(res.body.customer){
          this.customer = res.body.customer
        }else if(res.body.supplyer){
          this.supplyer = res.body.supplyer
        }
      }
    })
  }

}
