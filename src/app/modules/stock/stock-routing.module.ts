import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStockComponent } from './add-stock/add-stock.component';
import { StockComponent } from './stock.component';
import { SupplyInvoiceListComponent } from './supply-invoice-list/supply-invoice-list.component';

const routes: Routes = [{
  path: '', component: StockComponent,
  children: [
      {path: '', component: AddStockComponent},
      {path: 'supply-invoice-list', component: SupplyInvoiceListComponent},
      ]}
    ]

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class StockRoutingModule { }
