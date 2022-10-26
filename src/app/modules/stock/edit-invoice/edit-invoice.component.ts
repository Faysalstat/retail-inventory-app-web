import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScehduleDelivery, Supplyer } from '../../model/models';
import { InventoryService } from '../../services/inventory.service';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})
export class EditInvoiceComponent implements OnInit {
  id!:any;
  supplyer!:Supplyer;
  supplyOrders:any[] = [];
  supplyInvoice:any;
  selectedOrderItem:any;
  delieverySchedule:ScehduleDelivery = new ScehduleDelivery();
  constructor(
    private activatedRoute: ActivatedRoute,
    private inventoryService: InventoryService,
    private notificationService: NotificationService ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      this.id = parameter['id'];
      this.fetchInvoiceDetailsByID();
    });
  }
  fetchInvoiceDetailsByID(){
    this.inventoryService.fetchSupplyInvoiceById(this.id).subscribe({
      next:(res)=>{
        console.log(res.body);
        this.supplyer = res.body.supplyer;
        this.supplyOrders = res.body.supplyOrders;
        this.supplyInvoice = res.body;
      },
      error:(err)=>{
        this.notificationService.showMessage("ERROR",err.message,"OK",1000);
      }
    })
  }
 
  addDelievrySchedule(){
    let deliveryModel={
      orderId: this.selectedOrderItem.id,
      deliverableQuantity:this.delieverySchedule.deliverableQuantity,
      scheduledDate:this.delieverySchedule.scheduledDate,
      deliveryStatus: "DELIVERED",
      state:"OPEN"
    }
    console.log(deliveryModel);
    const params: Map<string, any> = new Map();
    params.set('delivery', deliveryModel);
    this.inventoryService.issueSupplyOrderDelievery(params).subscribe({
      next:(res)=>{
        console.log(res.body);
        this.delieverySchedule = new ScehduleDelivery();
        this.fetchInvoiceDetailsByID();
      },
      error:(err)=>{
        this.notificationService.showMessage("ERROR","DELIVERY ADD FAILED","OK",500);
      }
    })
  }

}
