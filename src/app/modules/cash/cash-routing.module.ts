import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAuthGuard } from '../app-auth.guard';
import { CashAuthGuard } from './cash-auth.guard';
import { CashTransactionComponent } from './cash-transaction/cash-transaction.component';
import { CashComponent } from './cash.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { LoanListComponent } from './loan-list/loan-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { AddLoanDetailsComponent } from '../comps/add-loan-details/add-loan-details.component';
import { TaskListComponent } from '../admin/task-list/task-list.component';
import { ApprovalDetailsComponent } from '../admin/approval-details/approval-details.component';
import { CashApprovalDetailsComponent } from '../admin/cash-approval-details/cash-approval-details.component';
import { LoanApprovalDetailsComponent } from '../admin/loan-approval-details/loan-approval-details.component';

const routes: Routes = [{
    path: '', component: CashComponent,canActivate:[AppAuthGuard],canActivateChild:[CashAuthGuard],
    children: [
        {path: '', component: CashTransactionComponent},
        {path: 'cash-transaction', component: CashTransactionComponent},
        {path: 'expenses', component: ExpensesComponent},
        {path: 'loan', component: AddLoanDetailsComponent},
        {path: 'transaction-list', component: TransactionListComponent},
        {path: 'loan-list', component: LoanListComponent},
        {path: 'loan-details/:id', component: LoanDetailsComponent},
        {path: 'task-list', component: TaskListComponent},
        {path: 'task-details/:id', component: ApprovalDetailsComponent},
        {path: 'tnx-task-details/:id', component: CashApprovalDetailsComponent},
        {path: 'loan-task-details/:id', component: LoanApprovalDetailsComponent},
        ]}
      ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashRoutingModule { }
