import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAuthGuard } from 'src/app/app-auth.guard';
import { PointOfSaleComponent } from '../comps/point-of-sale/point-of-sale.component';
import { EditSaleInvoiceComponent } from './edit-sale-invoice/edit-sale-invoice.component';
import { SaleInvoiceListComponent } from './sale-invoice-list/sale-invoice-list.component';
import { SalePointComponent } from './sale-point/sale-point.component';
import { SaleComponent } from './sale.component';

const routes: Routes = [{
    path: '', component: SaleComponent,
    children: [
        {path: '', component: PointOfSaleComponent},
        {path: 'test', component: SalePointComponent},
        {path: 'sale-invoice-list', component: SaleInvoiceListComponent},
        {path: 'edit-sale-invoice/:id', component: EditSaleInvoiceComponent},
        ]}
      ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
