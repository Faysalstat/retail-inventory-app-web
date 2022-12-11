import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  menuItems:any[] = [];
  constructor() {
    this.menuItems = [
      {label:"Client List",route:"client-list"}
    ]
   }

  ngOnInit(): void {
  }

}
