import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../model/models';
import { InventoryService } from '../../services/inventory.service';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-edit-sale-invoice',
  templateUrl: './edit-sale-invoice.component.html',
  styleUrls: ['./edit-sale-invoice.component.css']
})
export class EditSaleInvoiceComponent implements OnInit {
  id!:any;
  customer!:Customer;
  saleOrders:any[] = [];
  saleInvoice:any;
  selectedOrderItem:any;
  // delieverySchedule:ScehduleDelivery = new ScehduleDelivery();
  isDue: boolean = false;
  isDelivered: boolean = false;
  errMsg:string ="";
  payment:any;
  totalPaid:number = 0;
  duePayment: number =0;
  rebate:number = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private inventoryService: InventoryService,
    private notificationService: NotificationService ) { 
      this.payment = {
        invoiceId:0,
        newPayment:0,
        newRebate:0,
        newDueAmount:0,
        remarks:''
      }
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      this.id = parameter['id'];
      this.fetchInvoiceDetailsByID();
    });
  }
  fetchInvoiceDetailsByID(){
    this.inventoryService.fetchSaleInvoiceById(this.id).subscribe({
      next:(res)=>{
        console.log(res.body);
        this.customer = res.body.customer;
        this.saleOrders = res.body.orders;
        this.payment.invoiceId = this.id;
        this.saleInvoice = res.body;
        this.totalPaid = res.body.totalPaid;
        this.duePayment = res.body.duePayment;
        this.rebate = res.body.rebate;
          if(this.saleInvoice.duePayment > 0){
            this.isDue = true;
          }
        // for(let i =0; i< this.saleOrders.length; i++){
        //   if(this.saleOrders[i].duePayment > 0){
        //     this.isDue = true;
        //     break;
        //   }
        // }
        
      },
      error:(err)=>{
        this.notificationService.showMessage("ERROR",err.message,"OK",1000);
      }
    })
  }
  calculateNewSummary(){
    this.saleInvoice.totalPaid = this.totalPaid + this.payment.newPayment;
    this.saleInvoice.rebate = this.rebate + this.payment.newRebate;
    this.saleInvoice.duePayment = this.saleInvoice.totalPrice - this.saleInvoice.totalPaid - this.saleInvoice.rebate;
  }
  submitPayment(){
    const params: Map<string, any> = new Map();
    let paymentModel = {
      invoiceId : this.saleInvoice.id,
      accountId: this.customer.account.id,
      newPayment : this.payment.newPayment,
      updatedPaidAmount: this.saleInvoice.totalPaid,
      updatedDueAmount: this.saleInvoice.duePayment,
      updatedRebateAmount: this.saleInvoice.rebate,
      remarks: this.payment.remarks
    }
    params.set('payment', paymentModel);
    console.log(paymentModel);
    this.inventoryService.doNewPaymentTransaction(params).subscribe({
      next:(res)=>{
        console.log(res.body);
      }
    })
  }
  // addDelievrySchedule(){
  //   let deliveryModel={
  //     orderId: this.selectedOrderItem.id,
  //     deliverableQuantity:this.delieverySchedule.deliverableQuantity,
  //     scheduledDate:this.delieverySchedule.scheduledDate,
  //     deliveryStatus: "DELIVERED",
  //     state:"OPEN"
  //   }
  //   console.log(deliveryModel);
  //   const params: Map<string, any> = new Map();
  //   params.set('delivery', deliveryModel);
  //   this.inventoryService.issueSupplyOrderDelievery(params).subscribe({
  //     next:(res)=>{
  //       console.log(res.body);
  //       this.delieverySchedule = new ScehduleDelivery();
  //       this.fetchInvoiceDetailsByID();
  //     },
  //     error:(err)=>{
  //       this.notificationService.showMessage("ERROR","DELIVERY ADD FAILED","OK",500);
  //     }
  //   })
  // }
  // onSelectOrder(){
    
  //   if(this.selectedOrderItem.deliveryStatus == "DELIVERED"){
  //     this.isDelivered = true ;
  //     this.errMsg = "*This Product delivery is completed!";
  //   }else{
  //     this.isDelivered = false;
  //   }
  // }

  // onChangeDelievredQuantity(){
  //   let remainingPendingQuantity = this.selectedOrderItem.quantityOrdered- this.selectedOrderItem.quantityDelivered;
  //   if(this.delieverySchedule.deliverableQuantity>remainingPendingQuantity){
  //     this.errMsg = "*Delivered Quantity is Greater Than Remaining Order Quantity";
  //     return;
  //   }else{
  //     this.errMsg = "";
  //   }
  // }
}
