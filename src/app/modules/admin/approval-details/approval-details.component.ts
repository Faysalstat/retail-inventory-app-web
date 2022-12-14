import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tasks } from '../../model/models';
import { ClientService } from '../../services/client.service';
import { InventoryService } from '../../services/inventory.service';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-approval-details',
  templateUrl: './approval-details.component.html',
  styleUrls: ['./approval-details.component.css'],
})
export class ApprovalDetailsComponent implements OnInit {
  taskId!: any;
  taskDetail!: any;
  invoiceDetails!: any;
  supplyer!:any;
  customer!:any;
  comment:string= "";
  isStock:boolean = false;
  taskType:string = '';
  showLoader: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private inventoryService: InventoryService,
    private clientService: ClientService,
    private notificationService : NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchPayloadByTaskId();
  }

  fetchPayloadByTaskId() {
    this.showLoader  = true;
    this.activatedRoute.params.subscribe((parameter) => {
      let id = parameter['id'];
      this.taskId = id;
      
      this.inventoryService.fetchTaskById(this.taskId).subscribe({
        next: (res) => {
          this.showLoader  = false;
          this.taskDetail = res.body;
          this.invoiceDetails = res.body.payload;
          this.taskType = res.body.taskType;
          this.fetchClientById(res.body);
        },
      });
    });
  }

  fetchClientById(taskDetail:any) {
    if (taskDetail.taskType == 'CREATE_SUPPLY') {
      this.isStock = true;
      const params: Map<string, any> = new Map();
      params.set('id',taskDetail.payload.supplyerId);
      params.set('code', '');
      this.clientService.getSupplyerByCode(params).subscribe({
        next: (res) => {
          if (res.body) {
            this.supplyer = res.body;
          }
        },
      });
    } else {
      this.isStock = false;
      this.clientService.getCustomerById(taskDetail.payload.customerId).subscribe({
        next:(res)=>{
          console.log(res.body);
          this.customer = res.body
        }
      })
    }
  }
  submitOrder(){
    this.showLoader  = true;
      this.invoiceDetails.taskId = this.taskId;
      const params: Map<string, any> = new Map();
      if(this.isStock){
        params.set('order', this.invoiceDetails);
        this.inventoryService.issueBuyOrder(params).subscribe({
          next: (res) => {
            this.showLoader  = false;
            this.notificationService.showMessage(
              'SUCCESS!',
              'Invoice Created',
              'OK',
              500
            );
            this.router.navigate(['/admin/task-list']);
          },
          error: (err) => {
            this.showLoader  = false;
            console.log(err);
            this.notificationService.showMessage(
              'ERROR!',
              'Invoice Not Created',
              'OK',
              500
            );
          },
        });
      }else{
        params.set('invoice', this.invoiceDetails);
        this.inventoryService.issueSalesOrder(params).subscribe({
          next:(res)=>{
            this.showLoader  = false;
            this.notificationService.showMessage("SUCCESS","Order Placed Successfully","OK",300);
            this.router.navigate(['/admin/task-list']);
          },
          error:(err)=>{
            this.showLoader  = false;
            this.notificationService.showMessage("ERROR","Order Placed Failed","OK",300);
          }
        })
      }
      
  }

  declineApproval(){
    this.showLoader  = true;
    const params: Map<string, any> = new Map();
    let task = {
      taskId: this.taskId
    }
    params.set("task",task)
    this.inventoryService.declineApproval(params).subscribe({
      next:(res)=>{
        this.showLoader  = false;
        this.notificationService.showMessage("SUCCESSFULL","Approval Deleted","OK",500);
        this.router.navigate(['/admin/task-list']);
      },
      error:(err)=>{
        this.showLoader  = false;
        this.notificationService.showErrorMessage("Warning","Deletion Failed","Ok",500);
      }
    })
  }
}
