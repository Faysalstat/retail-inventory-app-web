import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ReportServiceService } from '../../services/report-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  glBalance:number = 0;
  assetBalance:number = 0;
  totalSell:number = 0;
  totalBuy:number = 0;
  dashboardSummary:any = {};
  entitySummary:any = {};
  showLoader:boolean = false;
  constructor(
    private reportService: ReportServiceService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    
    this.fetchDashboardSummary();
    this.fetchGlBalance();
    this.fetchEntitySummary();
    
  }
  fetchDashboardSummary(){
    this.showLoader = true;
    this.reportService.fetchDashboardSummary().subscribe({
      next:(res)=>{
        this.dashboardSummary = res.body;
      },
      error:(err)=>{

      },
      complete:()=>{
        this.showLoader = false;
      }
    })
  };
  fetchEntitySummary(){
    this.showLoader = true;
    this.reportService.fetchEntitySummary().subscribe({
      next:(res)=>{
        console.log(res)
        this.entitySummary = res.body;
      },
      error:(err)=>{

      },
      complete:()=>{
        this.showLoader = false;
      }
    })
  };
  fetchGlBalance(){
    this.adminService.getGlBalanceByType("INVENTORY_GL").subscribe({
      next:(res)=>{
        this.glBalance = res.body.balance;
      }
    })

  }
}
