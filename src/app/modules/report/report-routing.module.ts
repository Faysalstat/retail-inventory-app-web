import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { StockReportComponent } from './stock-report/stock-report.component';
import { SupplyReportComponent } from './supply-report/supply-report.component';
import { TreansactionReportComponent } from './treansaction-report/treansaction-report.component';

const routes: Routes = [{
  path: '', component: ReportComponent,
  children: [
      {path: 'transaction-report', component: TreansactionReportComponent},
      {path: 'sales-report', component: SalesReportComponent},
      {path: 'stock-report', component: StockReportComponent},
      {path: 'supply-report', component: SupplyReportComponent},
      ]}
    ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
