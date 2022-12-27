import { Component, OnInit } from '@angular/core';
import { ReportServiceService } from '../../services/report-service.service';

@Component({
  selector: 'app-treansaction-report',
  templateUrl: './treansaction-report.component.html',
  styleUrls: ['./treansaction-report.component.css']
})
export class TreansactionReportComponent implements OnInit {
  offset: number = 0;
  transactionList:any[] = [];
  transactionListExportable:any[] = [];
  tnxTypes!:any[];
  query!: any;
  constructor(
    private reportService: ReportServiceService
  ) { 
    this.query = {
      tnxType:"EXPENSE",
      isDebit: false,
      isCredit: false
    }
    this.tnxTypes = [
      {label:'Expense', value:'EXPENSE'},
      {label:'Income', value:'INCOME'}
    ]
  }

  ngOnInit(): void {
    this.fetchTransactionRecord();
  }
  fetchTransactionRecord(){
    const params: Map<string, any> = new Map();
    params.set('tnxType',this.query.tnxType);
    params.set('isDebit',this.query.isDebit);
    params.set('isCredit',this.query.isCredit);
    this.reportService.fetchTransactionRecord(params).subscribe({
      next:(res)=>{
        console.log(res.body);
        this.transactionList= res.body;
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }

}
