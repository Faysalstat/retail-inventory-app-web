import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-cash-approval-details',
  templateUrl: './cash-approval-details.component.html',
  styleUrls: ['./cash-approval-details.component.css']
})
export class CashApprovalDetailsComponent implements OnInit {
  taskId!:number;
  taskDetail!:any;
  showLoader: boolean = false;
  comment:string ="";
  updatedBalance:number = 0;
  userProfile:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private inventoryService: InventoryService,
    // private clientService: ClientService,
    private notificationService : NotificationService,
    private router: Router
  ) { 

  }

  ngOnInit(): void {
    this.userProfile = localStorage.getItem('username');
    this.fetchPayloadByTaskId();
  }

  fetchPayloadByTaskId() {
    this.activatedRoute.params.subscribe((parameter) => {
      let id = parameter['id'];
      this.taskId = id;
      this.inventoryService.fetchTaskById(this.taskId).subscribe({
        next: (res) => {
          console.log(res.body);
          this.taskDetail = res.body.payload;
          this.comment = this.taskDetail.comment;
          if(this.taskDetail.isReturn){
            this.updatedBalance = Number(this.taskDetail.account.balance) - Number(this.taskDetail.cashAmount)
          }else{
            this.updatedBalance = Number(this.taskDetail.account.balance) + Number(this.taskDetail.cashAmount)
          }
         
        },
      });
    });
  }

  declineApproval(){
    this.showLoader = true;
    const params: Map<string, any> = new Map();
    let task = {
      taskId: this.taskId
    }
    params.set("task",task)
    this.inventoryService.declineApproval(params).subscribe({
      next:(res)=>{
        this.showLoader = false;
        this.notificationService.showMessage("SUCCESSFULL","Approval Deleted","OK",500);
        this.router.navigate(['/admin/task-list']);
      },
      error:(err)=>{
        this.showLoader = false;
        this.notificationService.showErrorMessage("Warning","Deletion Failed","Ok",500);
      }
    })
  }

  approveTransaction(){
    this.showLoader = true;
    const params: Map<string, any> = new Map();
    this.taskDetail.taskId = this.taskId;
    this.taskDetail.comment = this.comment;
    this.taskDetail.approveBy = this.userProfile;
    params.set("payment",this.taskDetail);
    this.inventoryService.doPaymentTransaction(params).subscribe({
      next:(res)=>{
        this.showLoader = false;
        this.notificationService.showMessage("SUCCESS!","Payment Successful","OK",400);
        this.router.navigate(['/admin/task-list']);
      },
      error:(err)=>{
        this.showLoader = false;
        this.notificationService.showMessage("ERROR!","Payment FAILED","OK",200);
      }
    })
  }

}
