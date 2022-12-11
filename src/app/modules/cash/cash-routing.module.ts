import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashReceiveComponent } from './cash-receive/cash-receive.component';
import { CashTransactionComponent } from './cash-transaction/cash-transaction.component';
import { CashComponent } from './cash.component';

const routes: Routes = [{
    path: '', component: CashComponent,
    children: [
        {path: 'cash-transaction', component: CashTransactionComponent},
        {path: 'cash-receive', component: CashReceiveComponent},
        ]}
      ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashRoutingModule { }
