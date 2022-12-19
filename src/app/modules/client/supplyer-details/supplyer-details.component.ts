import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account, Person, Supplyer } from '../../model/models';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-supplyer-details',
  templateUrl: './supplyer-details.component.html',
  styleUrls: ['./supplyer-details.component.css']
})
export class SupplyerDetailsComponent implements OnInit {
  client!:any;
  person:Person = new Person();
  account:Account = new Account();
  accountHistory: any[] = [];
  supplyer:Supplyer = new Supplyer();
  showAccountHistory:boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService:ClientService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      let id = parameter['id'];
      console.log(id)
      this.fetchAccountDetailsById(id);
    })
  }
  fetchAccountDetailsById(id:any){
    const params: Map<string, any> = new Map();
    params.set('id',id);
    this.clientService.getPersonById(id).subscribe({
      next:(res)=>{
        this.person = res.body;
        console.log(res.body);
        if(res.body.supplyer){
          this.supplyer = res.body.supplyer;
          this.account = res.body.supplyer.account;
          this.accountHistory = res.body.supplyer.account.accountHistories;
        }
      }
    })
  }
  showHistory(event:boolean){
    if(event){
      this.showAccountHistory = true;
    }else{
      this.showAccountHistory = false;
    }

  }

}

