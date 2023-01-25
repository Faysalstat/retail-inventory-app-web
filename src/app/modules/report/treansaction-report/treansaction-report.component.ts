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
  tnxCategory!:any[];
  tnxTypes!:any[];
  query!: any;
  constructor(
    private reportService: ReportServiceService
  ) { 
    this.query = {
      tnxCategory:"",
      tnxType:"",
      fromDate:'',
      toDate:'',
    }
    this.tnxCategory = [
      {label:'All Category', value:''},
      {label:'Income', value:'INCOME'},
      {label:'Expense', value:'EXPENSE'},
      {label:'Deposit', value:'DEPOSIT'}
    ];
    this.tnxTypes = [
      {label:'All Type', value:''},
      {label:'Debit', value:'DEBIT'},
      {label:'Credit', value:'CREDIT'}
    ]
  }

  ngOnInit(): void {
    this.fetchTransactionRecord();
  }
  fetchTransactionRecord(){
    const params: Map<string, any> = new Map();
    params.set('tnxType',this.query.tnxType);
    params.set('tnxCategory',this.query.tnxCategory);
    params.set('fromDate',this.query.fromDate);
    params.set('toDate',this.query.toDate);
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
