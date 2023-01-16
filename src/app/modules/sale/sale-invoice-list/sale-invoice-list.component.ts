import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-sale-invoice-list',
  templateUrl: './sale-invoice-list.component.html',
  styleUrls: ['./sale-invoice-list.component.css']
})
export class SaleInvoiceListComponent implements OnInit {

  isListExist:boolean = false;
  saleInvoiceList:any[] = [];
  offset = 0;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100,500,1000];
  queryBody:any;
  constructor(
    private route: Router,
    private inventoryService: InventoryService,
    private notificationService: NotificationService 
  ) { 
    this.queryBody={
      offset:0,
      limit:0,
      invoiceNo:'',
      contactNo:'',
      deliveryStatus:'',
      fromDate: new Date('01-01-2023'),
      toDate: new Date(),

    }
  }

  ngOnInit(): void {
    this.fetchSaleInvoices();
  }
  fetchSaleInvoices(){
    const params: Map<string, any> = new Map();
    this.queryBody.offset = this.offset;
    this.queryBody.limit = this.pageSize;
    params.set('query', this.queryBody);
    this.inventoryService.fetchAllSaleInvoice(params).subscribe({
      next:(res)=>{
        console.log(res.body);
        if(res.body.length>0){
          this.isListExist = true;
        }else{
          this.isListExist = false;
        }
        this.saleInvoiceList = res.body;
      },
      error:(err)=>{
        console.log(err);
        this.notificationService.showMessage("ERROR!","Invoice List fetching failed","OK",2000);
      }
    })

  }
  pageChange(event:any){
    this.pageSize = event.pageSize;
    this.offset = this.pageSize * event.pageIndex;
    this.fetchSaleInvoices();
  }
  viewInvoice(invoice:any){
    this.route.navigate(["/sale/edit-sale-invoice",invoice.id]);
  }

  refresh(){
    this.queryBody={
      offset:0,
      limit:0,
      invoiceNo:'',
      contactNo:'',
      deliveryStatus:'',
      fromDate: new Date('01-01-2023'),
      toDate: new Date(),
    }
    this.fetchSaleInvoices();
  }
  export(){

  }

}
