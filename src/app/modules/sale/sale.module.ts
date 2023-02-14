import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalePointComponent } from './sale-point/sale-point.component';
import { SaleRoutingModule } from './sale-routing.module';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompsModule } from '../comps/comps.module';
import { SaleInvoiceListComponent } from './sale-invoice-list/sale-invoice-list.component';
import { EditSaleInvoiceComponent } from './edit-sale-invoice/edit-sale-invoice.component';
import { SaleComponent } from './sale.component';
import { ReturnOrderComponent } from './return-order/return-order.component';



@NgModule({
  declarations: [
    SalePointComponent,
    SaleInvoiceListComponent,
    EditSaleInvoiceComponent,
    SaleComponent,
    ReturnOrderComponent
  ],
  imports: [
    CommonModule,
    SaleRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CompsModule
  ]
})
export class SaleModule { }
