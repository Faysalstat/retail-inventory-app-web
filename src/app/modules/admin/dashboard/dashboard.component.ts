import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  glBalance:number = 0;
  totalSell:number = 0;
  totalBuy:number = 0;
  dailySummary:any = {};
  constructor() { }

  ngOnInit(): void {
  }

}
