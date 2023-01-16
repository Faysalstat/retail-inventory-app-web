import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NotificationService } from '../../services/notification-service.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  @Output() expenseEvent = new EventEmitter<string>();
  expenseType!:string;
  expenseTypes!:any[];
  amount!:number;
  receivedBy!:string;
  remarks!:string;
  selectedExpense!:any;
  expenseReason!:string;
  isSubmitted: boolean = false;
  showLoader: boolean = false;
  paymentMethods:any = [];
  paymentMethod:string = "CASH";
  constructor(
    private notificationService: NotificationService,
    private transactionService: TransactionService,
  ) { 
    this.paymentMethods = [
      { label: 'Select Payment Method', value: '' },
      { label: 'BANK', value: 'BANK' },
      { label: 'BKASH', value: 'BKASH' },
      { label: 'CASH', value: 'CASH' },
    ];
  }

  ngOnInit(): void {

  }
  
  // fetchExpenseCategory(){
  //   this.transactionService.fetchExpenseCategories("OFFICE").subscribe({
  //     next:(data)=>{
  //       if(data){
  //         this.expenseTypes = data.body;
  //         console.log(data.body);
  //       }
  //     },
  //     error:(err)=>{
  //       console.log(err.message);
  //       this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
  //     }
  //   })
  // }

  submit(){
    this.isSubmitted = true;
    let expenseModel = {
        expenseReason: this.expenseReason,
        paymentMethod: this.paymentMethod,
        cashAmount: this.amount,
        receivedBy: this.receivedBy,
        comment: this.remarks,
    }
    const params:Map<string,any> = new Map();
    params.set("expenseModel",expenseModel);
    this.transactionService.doExpense(params).subscribe({
      next:(data)=>{
        this.isSubmitted = false;
        this.selectedExpense = null;
        this.amount = 0;
        this.receivedBy = "";
        this.remarks ="";
        this.expenseReason = "";
        this.expenseEvent.emit("Balance Changed");
        this.notificationService.showMessage("Success!","Payment Complete","OK",2000);
      },
      error:(err)=>{
        this.isSubmitted = false;
        console.log(err.message);
        this.notificationService.showErrorMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      }
    })
  }
}
