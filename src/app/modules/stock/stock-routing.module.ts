import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductConfigComponent } from '../admin/product-config/product-config.component';
import { ProductManagementComponent } from '../admin/product-management/product-management.component';
import { AppAuthGuard } from '../app-auth.guard';
import { SupplyerComponent } from '../client/supplyer/supplyer.component';
import { AddStockComponent } from './add-stock/add-stock.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { ReturnSupplyOrderComponent } from './return-supply-order/return-supply-order.component';
import { StockAuthGuard } from './stock-auth.guard';
import { StockComponent } from './stock.component';
import { SupplyInvoiceListComponent } from './supply-invoice-list/supply-invoice-list.component';
import { AddStockSupplylessComponent } from './add-stock-supplyless/add-stock-supplyless.component';
import { AddStockQuantityComponent } from './add-stock-quantity/add-stock-quantity.component';
import { StockHistoryListComponent } from './stock-history-list/stock-history-list.component';

const routes: Routes = [{
  path: '', component: StockComponent,canActivate:[AppAuthGuard],canActivateChild:[StockAuthGuard],
  children: [
      {path: '', component: AddStockSupplylessComponent},
      {path: 'create-supply', component: AddStockSupplylessComponent},
      {path: 'supply-invoice-list', component: StockHistoryListComponent},
      {path: 'edit-supply-invoice/:id', component: EditInvoiceComponent},
      {path: 'product-stock', component: ProductManagementComponent},
      {path: 'product-detail/:id', component: ProductConfigComponent},
      {path: 'return-supply-order/:id', component: ReturnSupplyOrderComponent},
      {path: 'supplyer-list', component: SupplyerComponent},
      ]}
    ]

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class StockRoutingModule { }
