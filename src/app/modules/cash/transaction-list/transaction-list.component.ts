import { Component, OnInit } from '@angular/core';
import { ExcelExportService } from '../../services/excel-export.service';
import { NotificationService } from '../../services/notification-service.service';
import { ReportServiceService } from '../../services/report-service.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  offset = 0;
  length = 100;
  pageSize = 100;
  pageSizeOptions: number[] = [100,500,1000];
  transactionList:any[] = [];
  transactionListExportable:any[] = [];
  transactionType!:any[];
  tnxTypes!:any[];
  query!: any;
  constructor(
    private reportService: ReportServiceService,
    private notificationService:NotificationService,
    private excelExportServie :ExcelExportService
  ) { 
    this.query = {
      transactionType:"",
      tnxType:"",
      fromDate:'',
      toDate:'',
      voucherNo:''
    }
    this.transactionType = [
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
    params.set('offset',this.offset);
    params.set('limit',this.pageSize);
    params.set('tnxType',this.query.tnxType);
    params.set('voucherNo',this.query.voucherNo);
    params.set('fromDate',this.query.fromDate);
    params.set('toDate',this.query.toDate);
    params.set('transactionCategory','');
    this.reportService.fetchTransactionRecord(params).subscribe({
      next:(res)=>{
        this.transactionListExportable = [];
        this.transactionList= res.body.data;
        this.length = res.body.size;
        this.transactionList.map((elem)=>{
          let item = {
            TNX_TYPE:elem.transactionType,
            TNX_REASON:elem.transactionReason,
            DEBIT: elem.income,
            CREDIT: elem.expense,
            TNX_DATE:elem.transactionDate,
            REMARK:elem.refference,
          };
          this.transactionListExportable.push(item);
        })
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }
  exportAsExcel(){
      this.excelExportServie.exportAsExcelFile(this.transactionListExportable,"Tnx-Report");
  }
  pageChange(event:any){
    this.pageSize = event.pageSize;
    this.offset = this.pageSize * event.pageIndex;
    this.fetchTransactionRecord();
  }
}
