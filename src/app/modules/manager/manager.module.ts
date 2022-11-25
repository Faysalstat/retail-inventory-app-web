import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerSalePointComponent } from './manager-sale-point/manager-sale-point.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { ClientManagementComponent } from './client-management/client-management.component';
import { CompsModule } from '../comps/comps.module';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CashTransactionComponent } from './cash-transaction/cash-transaction.component';



@NgModule({
  declarations: [
    ManagerSalePointComponent,
    ClientManagementComponent,
    CashTransactionComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CompsModule
  ]
})
export class ManagerModule { }
