import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScehduleDelivery, Supplyer } from '../../model/models';
import { InventoryService } from '../../services/inventory.service';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css'],
})
export class EditInvoiceComponent implements OnInit {
  id!: any;
  supplyer!: Supplyer;
  supplyOrders: any[] = [];
  supplyInvoice: any;
  selectedOrderItem: any;
  delieverySchedule: ScehduleDelivery = new ScehduleDelivery();
  isPending: boolean = false;
  isDelivered: boolean = false;
  errMsg: string = '';
  isDue: boolean = false;
  payment: any;
  totalPaid: number = 0;
  duePayment: number = 0;
  rebate: number = 0;
  comment!: string;
  selection = new SelectionModel<any>(true, []);

  constructor(
    private activatedRoute: ActivatedRoute,
    private inventoryService: InventoryService,
    private notificationService: NotificationService
  ) {
    this.payment = {
      invoiceId: 0,
      newPayment: 0,
      newRebate: 0,
      newDueAmount: 0,
    };
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      this.id = parameter['id'];
      this.fetchInvoiceDetailsByID();
    });
  }
  fetchInvoiceDetailsByID() {
    this.inventoryService.fetchSupplyInvoiceById(this.id).subscribe({
      next: (res) => {
        console.log(res.body);
        this.supplyer = res.body.supplyer;
        this.supplyOrders = res.body.supplyOrders;
        this.isPending = false;
        this.supplyInvoice = res.body;
        this.totalPaid = res.body.totalPaid;
        this.duePayment = res.body.duePayment;
        this.rebate = res.body.rebate;
        this.comment = res.body.remarks;
        if (this.supplyInvoice.duePayment > 0) {
          this.isDue = true;
        }
        for (let i = 0; i < this.supplyOrders.length; i++) {
          if (this.supplyOrders[i].deliveryStatus == 'PENDING') {
            this.isPending = true;
            break;
          }
        }
      },
      error: (err) => {
        this.notificationService.showMessage('ERROR', err.message, 'OK', 1000);
      },
    });
  }

  addDelievrySchedule(order: any) {
    let deliveryModel = {};
    if (order != null) {
      deliveryModel = {
        orderId: order.id,
        deliverableQuantity: order.quantityOrdered - order.quantityDelivered,
        scheduledDate: new Date(),
        deliveryStatus: 'DELIVERED',
        isSupply: true,
        state: 'OPEN',
        invoiceId: order.supplyInvoiceId,
      };
    } else {
      deliveryModel = {
        orderId: this.selectedOrderItem.id,
        invoiceId: this.supplyInvoice.id,
        deliverableQuantity: this.delieverySchedule.deliverableQuantity,
        scheduledDate: this.delieverySchedule.scheduledDate,
        deliveryStatus: 'DELIVERED',
        isSupply: true,
        state: 'OPEN',
      };
    }
    console.log(deliveryModel);
    const params: Map<string, any> = new Map();
    params.set('delivery', deliveryModel);
    this.inventoryService.issueSupplyOrderDelievery(params).subscribe({
      next: (res) => {
        console.log(res.body);
        this.delieverySchedule = new ScehduleDelivery();
        this.fetchInvoiceDetailsByID();
      },
      error: (err) => {
        this.notificationService.showMessage(
          'ERROR',
          'DELIVERY ADD FAILED',
          'OK',
          500
        );
      },
    });
  }
  onSelectOrder(event:any) {
    console.log(event);
    this.selectedOrderItem = event.source.value;
    console.log(this.selectedOrderItem);
    if (this.selectedOrderItem.deliveryStatus == 'DELIVERED') {
      this.isDelivered = true;
      this.errMsg = '*This Product delivery is completed!';
    } else {
      this.isDelivered = false;
      this.errMsg = '';
    }
  }

  onChangeDelievredQuantity() {
    let remainingPendingQuantity =
      this.selectedOrderItem.quantityOrdered -
      this.selectedOrderItem.quantityDelivered;
    if (this.delieverySchedule.deliverableQuantity > remainingPendingQuantity) {
      this.errMsg =
        '*Delivered Quantity is Greater Than Remaining Order Quantity';
      return;
    } else {
      this.errMsg = '';
    }

    if(remainingPendingQuantity==0){
      this.selectedOrderItem.deliveryStatus = 'DELIVERED';
    }else{
      this.selectedOrderItem.deliveryStatus = 'PENDING';
    }
  }
  calculateNewSummary() {
    this.supplyInvoice.totalPaid = this.totalPaid + this.payment.newPayment;
    this.supplyInvoice.rebate = this.rebate + this.payment.newRebate;
    this.supplyInvoice.duePayment =
      this.supplyInvoice.totalPrice -
      this.supplyInvoice.totalPaid -
      this.supplyInvoice.rebate;
  }
  updateComment() {
    let inviceModel = {
      comment: this.comment,
      invoiceId: this.supplyInvoice.id,
    };
    const params: Map<string, any> = new Map();
    params.set('invoice', inviceModel);
    this.inventoryService.updateSupplyInvoice(params).subscribe({
      next: (res) => {
        console.log(res.body);
        this.notificationService.showMessage(
          'SUCCESS',
          'Invoice Updated',
          'OK',
          500
        );
      },
    });
  }

  deliverAll() {
    console.log(this.selection.selected)
    let selectedOrders = this.selection.selected;
    for (let i = 0; i < selectedOrders.length; i++) {
      let order = selectedOrders[i];
      if (order.deliveryStatus != 'DELIVERED') {
        let deliveryModel = {
          orderId: order.id,
          deliverableQuantity: order.quantityOrdered - order.quantityDelivered,
          scheduledDate: new Date(),
          deliveryStatus: 'DELIVERED',
          isSupply: true,
          state: 'OPEN',
          invoiceId: order.supplyInvoiceId,
        };
        const params: Map<string, any> = new Map();
        params.set('delivery', deliveryModel);
        this.inventoryService.issueSupplyOrderDelievery(params).subscribe({
          next: (res) => {
            console.log(res.body);
            this.fetchInvoiceDetailsByID();
          },
          error: (err) => {
            this.notificationService.showMessage(
              'ERROR',
              'DELIVERY ADD FAILED',
              'OK',
              500
            );
          },
        });
      }
    }
  }

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.supplyOrders.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.supplyOrders.forEach((row) =>{
            this.selection.select(row)
          });
  }
}
