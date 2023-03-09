import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-profit-calculation',
  templateUrl: './profit-calculation.component.html',
  styleUrls: ['./profit-calculation.component.css']
})
export class ProfitCalculationComponent implements OnInit {
  incomeAccountHistoryList!:any[];
  extraChargeAccountHistoryList!:any[];
  expenseAccountHistoryList!:any[];
  totalProfit = 0;
  totalIncome = 0;
  totalExpense = 0;
  totalExtraCharge = 0;
  queryBody!:any;
  constructor(
    private clientService: ClientService,
    private notificationService: NotificationService,
    // private excelExportService: ExcelExportService
  ) {
    this.queryBody={
      fromDate: new Date('1/1/2023'),
      toDate: new Date(),
    }
  }

  ngOnInit(): void {
    this.fetchProfitCalculationData();
  }

  fetchProfitCalculationData(){
    const params: Map<string, any> = new Map();
    params.set("fromDate",this.queryBody.fromDate);
    params.set("toDate",this.queryBody.toDate);
    this.clientService.getAccountHistoryForProfitCalculation(params).subscribe({
      next:(res)=>{
        console.log(res);
        this.totalIncome=0;
        this.totalExpense=0;
        this.totalExtraCharge=0;
        this.incomeAccountHistoryList = res.body.incomeAccountHistories;
        this.extraChargeAccountHistoryList = res.body.extraChargeAccountHistories;
        this.expenseAccountHistoryList = res.body.expenseAccountHistories;
        this.incomeAccountHistoryList.map((elem)=>{
          elem.tnxType=='CREDIT'?(this.totalIncome += elem.tnxAmount):(this.totalIncome -= elem.tnxAmount)
        })
        this.extraChargeAccountHistoryList.map((elem)=>{
          elem.tnxType=='CREDIT'?(this.totalExtraCharge += elem.tnxAmount):(this.totalExtraCharge -= elem.tnxAmount)
        })
        this.expenseAccountHistoryList.map((elem)=>{
          elem.tnxType=='DEBIT'?(this.totalExpense += elem.tnxAmount):(this.totalExpense -= elem.tnxAmount)
        })
      },
      error:(err)=>{}
    })
  }

}
