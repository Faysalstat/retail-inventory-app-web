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
  isPending: boolean = false;
  isDelivered: boolean = false;
  errMsg:string ="";
  isDue: boolean = false;
  payment:any;
  totalPaid:number = 0;
  duePayment: number =0;
  rebate:number = 0;
  comment!:string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private inventoryService: InventoryService,
    private notificationService: NotificationService ) { 
      this.payment = {
        invoiceId:0,
        newPayment:0,
        newRebate:0,
        newDueAmount:0
      }
    }

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
        this.isPending = false;
        this.supplyInvoice = res.body;
        this.totalPaid = res.body.totalPaid;
        this.duePayment = res.body.duePayment;
        this.rebate = res.body.rebate;
        this.comment = res.body.remarks;
        if(this.supplyInvoice.duePayment > 0){
          this.isDue = true;
        }
        for(let i =0; i< this.supplyOrders.length; i++){
          if(this.supplyOrders[i].deliveryStatus == "PENDING"){
            this.isPending = true;
            break;
          }
        }
        
      },
      error:(err)=>{
        this.notificationService.showMessage("ERROR",err.message,"OK",1000);
      }
    })
  }
 
  addDelievrySchedule(order:any){
    let deliveryModel={};
    if(order !=null){
      deliveryModel={
        orderId: order.id,
        deliverableQuantity:order.quantityOrdered - order.quantityDelivered,
        scheduledDate:new Date(),
        deliveryStatus: "DELIVERED",
        state:"OPEN"
      }
    }else{
      deliveryModel={
        orderId: this.selectedOrderItem.id,
        deliverableQuantity:this.delieverySchedule.deliverableQuantity,
        scheduledDate:this.delieverySchedule.scheduledDate,
        deliveryStatus: "DELIVERED",
        state:"OPEN"
      }
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
  onSelectOrder(){
    
    if(this.selectedOrderItem.deliveryStatus == "DELIVERED"){
      this.isDelivered = true ;
      this.errMsg = "*This Product delivery is completed!";
    }else{
      this.isDelivered = false;
    }
  }

  onChangeDelievredQuantity(){
    let remainingPendingQuantity = this.selectedOrderItem.quantityOrdered- this.selectedOrderItem.quantityDelivered;
    if(this.delieverySchedule.deliverableQuantity>remainingPendingQuantity){
      this.errMsg = "*Delivered Quantity is Greater Than Remaining Order Quantity";
      return;
    }else{
      this.errMsg = "";
    }
  }
  calculateNewSummary(){
    this.supplyInvoice.totalPaid = this.totalPaid + this.payment.newPayment;
    this.supplyInvoice.rebate = this.rebate + this.payment.newRebate;
    this.supplyInvoice.duePayment = this.supplyInvoice.totalPrice - this.supplyInvoice.totalPaid - this.supplyInvoice.rebate;
  }
  updateComment(){
    let inviceModel = {
      comment : this.comment,
      invoiceId: this.supplyInvoice.id
    }
    const params: Map<string, any> = new Map();
    params.set('invoice', inviceModel);
    this.inventoryService.updateSupplyInvoice(params).subscribe({
      next:(res)=>{
        console.log(res.body);
        this.notificationService.showMessage("SUCCESS","Invoice Updated","OK",500);
      }
    })
  }

}
