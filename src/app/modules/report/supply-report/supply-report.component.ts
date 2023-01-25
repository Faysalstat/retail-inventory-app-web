import { Component, OnInit } from '@angular/core';
import { ReportServiceService } from '../../services/report-service.service';

@Component({
  selector: 'app-supply-report',
  templateUrl: './supply-report.component.html',
  styleUrls: ['./supply-report.component.css']
})
export class SupplyReportComponent implements OnInit {
  offset:number = 0;
  limit = 5;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  orderList:any[] = [];
  orderListExportable:any[] = [];
  statusOptions!:any[];
  queryBody!: any;
  constructor(
    private reportService: ReportServiceService
  ) { 
    this.queryBody = {
      deliveryStatus:'',
      invoiceNo: '',
      orderNo:'',
      productCode:''
    }
    this.statusOptions = [
      {label:'All', value:''},
      {label:'Delivered', value:'DELIVERED'},
      {label:'Pending', value:'PENDING'}
    ]
  }

  ngOnInit(): void {
    this.fetchOrderRecord();
  }
  fetchOrderRecord(){
    this.queryBody.offset = this.offset;
    this.queryBody.limit = this.pageSize;
    this.reportService.fetchSupplyOrderListRecord(this.queryBody).subscribe({
      next:(res)=>{
        console.log(res.body);
        this.orderList= res.body.data;
        this.length = res.body.length;
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }

  pageChange(event:any){
    this.pageSize = event.pageSize;
    this.offset = this.pageSize * event.pageIndex;
    this.fetchOrderRecord();
  }

}


