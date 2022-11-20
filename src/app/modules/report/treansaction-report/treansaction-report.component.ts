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
  constructor(
    private reportService: ReportServiceService
  ) { }

  ngOnInit(): void {
    this.fetchTransactionRecord();
  }
  fetchTransactionRecord(){
    const params: Map<string, any> = new Map();
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
