import { Component, OnInit } from '@angular/core';
import { ReportServiceService } from '../../services/report-service.service';

@Component({
  selector: 'app-profit-report',
  templateUrl: './profit-report.component.html',
  styleUrls: ['./profit-report.component.css']
})
export class ProfitReportComponent implements OnInit {
profitSummary!:any;
totalProfitFromSale = 0;
query = {};
  constructor(
    private reportService: ReportServiceService
  ) {
    this.query ={
      fromDate:'',
      toDate:''
    }
   }

  ngOnInit(): void {
    this.fetchReportSummary();
  }
fetchReportSummary(){
  this.reportService.fetchProfitReport().subscribe({
    next:(res)=>{
      this.profitSummary = res.body;
      this.totalProfitFromSale = this.profitSummary.totalSellingPrice - this.profitSummary.totalBuyingPrice
       - this.profitSummary.totalDiscountGiven + this.profitSummary.totalExtraChargeTaken;
    }
  })
}
}
