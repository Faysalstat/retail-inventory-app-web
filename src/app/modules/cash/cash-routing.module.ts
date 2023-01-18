import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAuthGuard } from '../app-auth.guard';
import { CashAuthGuard } from './cash-auth.guard';
import { CashTransactionComponent } from './cash-transaction/cash-transaction.component';
import { CashComponent } from './cash.component';
import { ExpensesComponent } from './expenses/expenses.component';

const routes: Routes = [{
    path: '', component: CashComponent,canActivate:[AppAuthGuard],canActivateChild:[CashAuthGuard],
    children: [
        {path: '', component: CashTransactionComponent},
        {path: 'cash-transaction', component: CashTransactionComponent},
        {path: 'expenses', component: ExpensesComponent},
        ]}
      ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashRoutingModule { }
