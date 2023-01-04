import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification-service.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-add-tnx-reason',
  templateUrl: './add-tnx-reason.component.html',
  styleUrls: ['./add-tnx-reason.component.css']
})
export class AddTnxReasonComponent implements OnInit {
  tnxReason!:string;
  constructor(
    private tnxService: TransactionService,
    private notificationService : NotificationService
  ) { }

  ngOnInit(): void {
  }

  addTnxReason(){
    const params: Map<string, any> = new Map();
    let model = {
      key: this.tnxReason,
      value: this.tnxReason.toUpperCase()
    }
    params.set("model",model);
    this.tnxService.addTransactionReason(params).subscribe({
      next:(res)=>{
        if(res.body){
          this.notificationService.showMessage("SUCCESS",res.message,"OK",500);
        }
      }
    })
  }

}
