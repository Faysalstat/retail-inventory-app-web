import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css']
})
export class ClientManagementComponent implements OnInit {
  clientList!:any[];
  constructor(
    private formBuilder:FormBuilder,
    private clientService: ClientService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.fetchClientList("CUSTOMER");
  }

  fetchClientList(clientType:any){
    this.clientService.getAllClient(clientType).subscribe({
      next:(res)=>{
        console.log(res.body);
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }

}
