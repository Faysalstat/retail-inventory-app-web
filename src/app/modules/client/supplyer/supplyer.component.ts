import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-supplyer',
  templateUrl: './supplyer.component.html',
  styleUrls: ['./supplyer.component.css']
})
export class SupplyerComponent implements OnInit {
  clientList!:any[];
  constructor(
    private formBuilder:FormBuilder,
    private clientService: ClientService,
    private notificationService: NotificationService,
    private route: Router
  ) {

   }

  ngOnInit(): void {
    this.fetchClientList("SUPPLYER");
  }
  fetchClientList(clientType:any){
    this.clientService.getAllClient(clientType).subscribe({
      next:(res)=>{
        console.log(res.body);
        this.clientList = res.body;
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }
  viewClient(id:any){
    this.route.navigate(["client/supplyer-details",id]);
  }
}