import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Employee } from '../../model/models';
import { ClientService } from '../../services/client.service';
import { NotificationService } from '../../services/notification-service.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-salary-expense',
  templateUrl: './salary-expense.component.html',
  styleUrls: ['./salary-expense.component.css']
})
export class SalaryExpenseComponent implements OnInit {
  @Output() salaryEvent = new EventEmitter<string>();
  amount!:number;
  employeeId!:string;
  employee: Employee = new Employee();
  receivedBy!:string;
  remarks:string = '';
  isSubmitted: boolean = false;
  showLoader: boolean = false;
  monthOfSalary:any[] = [];
  paymentMethods:any[] = [];
  paymentMethod:string = "CASH";
  isApprovalNeeded:boolean = false;
  userName:any;
  constructor(
    private notificationService: NotificationService,
    private transactionService: TransactionService,
    private clientService: ClientService
  ) { 
    this.paymentMethods = [
      { label: 'Select Payment Method', value: '' },
      { label: 'CASH', value: 'CASH' },
      { label: 'BANK', value: 'BANK' },
      { label: 'BKASH', value: 'BKASH' },
    ];
    this.monthOfSalary = [
      {label:"Select Month",value:''},
      {label:"January",value:"Salary Of January"},
      {label:"February",value:"Salary Of February"},
      {label:"March",value:"Salary Of March"},
      {label:"April",value:"Salary Of April"},
      {label:"May",value:"Salary Of May"},
      {label:"June",value:"Salary Of June"},
      {label:"July",value:"Salary Of July"},
      {label:"August",value:"Salary Of August"},
      {label:"September",value:"Salary Of September"},
      {label:"October",value:"Salary Of October"},
      {label:"November",value:"Salary Of November"},
      {label:"December",value:"Salary Of December"}
    ]
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('username');
  }
  searchEmployeeById(){
    this.showLoader = true;
    const params:Map<string,any> = new Map();
    params.set("id",'');
    params.set("employeeId",this.employeeId);
    this.clientService.getEmployeeByCodeOrID(params).subscribe({
      next:(res)=>{
        this.employee = res.body;
      },
      error:(err)=>{

      },
      complete:()=>{
        this.showLoader = false;
      }
    })
  }
  submit(){
    this.isSubmitted = true;
    if(!this.employee.id || !this.amount ){
      this.notificationService.showErrorMessage("INVALID","Input All Data","OK",200);
      return;
    }
    let expenseModel = {
        transactionReason: "EMP_SALARY",
        paymentMethod: this.paymentMethod,
        cashAmount: this.amount,
        receivedBy: this.employee.id,
        comment: this.remarks,
        transactionType:"EXPENSE",
        issuedBy:this.userName
    };
    if(this.isApprovalNeeded){

    }else{
      const params:Map<string,any> = new Map();
      params.set("salaryModel",expenseModel);
      this.transactionService.paySalary(params).subscribe({
        next:(data)=>{
          this.isSubmitted = false;
          if(data.isSuccess){
            this.employeeId = '';
            this.amount = 0;
            this.employee = new Employee()
            this.remarks ="";
            this.salaryEvent.emit("Balance Changed");
            this.notificationService.showMessage("Success!","Payment Complete","OK",500);
          }else{
            this.notificationService.showErrorMessage("ERROR!",data.message,"OK",500);
          }
        },
        error:(err)=>{
          this.isSubmitted = false;
          console.log(err.message);
          this.notificationService.showErrorMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
        }
      })
    }
    }
    
}