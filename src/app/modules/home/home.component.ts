import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  menuItems:any [] = [];
  constructor() {
    this.menuItems = [
      {
        imgUrl:"icon-admin.png",
        title: "ADMIN",
        route: "/admin"
      },
      {
        imgUrl:"icon-posh.png",
        title: "POS",
        route: "/sale"
      },
      {
        imgUrl:"icon-client.png",
        title: "CLIENT",
        route: "/client"
      },
      {
        imgUrl:"icon-cash.png",
        title: "CASH",
        route: "/cash"
      },
      {
        imgUrl:"icon-stock.png",
        title: "STOCK",
        route: "/stock"
      },
    ]
  }

  ngOnInit(): void {
  }

}
