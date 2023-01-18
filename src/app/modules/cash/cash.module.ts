import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material.module';
import { CompsModule } from '../comps/comps.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CashComponent } from './cash.component';
import { CashRoutingModule } from './cash-routing.module';
import { CashTransactionComponent } from './cash-transaction/cash-transaction.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { ExpensesComponent } from './expenses/expenses.component';



@NgModule({
  declarations: [
    CashComponent,
    CashTransactionComponent,
    TransactionListComponent,
    ExpensesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CompsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    CashRoutingModule
  ]
})
export class CashModule { }
