import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAuthGuard } from '../app-auth.guard';
import { ProfitReportComponent } from '../comps/profit-report/profit-report.component';
import { AccountHistoryReportComponent } from './account-history-report/account-history-report.component';
import { LoanReportComponent } from './loan-report/loan-report.component';
import { ReportAuthGuard } from './report-auth.guard';
import { ReportComponent } from './report.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { StockReportComponent } from './stock-report/stock-report.component';
import { SupplyReportComponent } from './supply-report/supply-report.component';
import { TreansactionReportComponent } from './treansaction-report/treansaction-report.component';

const routes: Routes = [{
  path: '', component: ReportComponent,canActivate:[AppAuthGuard],canActivateChild:[ReportAuthGuard],
  children: [
      {path: '', component: TreansactionReportComponent},
      {path: 'transaction-report', component: TreansactionReportComponent},
      {path: 'loan-report', component: LoanReportComponent},
      {path: 'sales-report', component: SalesReportComponent},
      {path: 'stock-report', component: StockReportComponent},
      {path: 'supply-report', component: SupplyReportComponent},
      {path: 'profit-report', component: ProfitReportComponent},
      {path: 'account-history-report', component: AccountHistoryReportComponent},
      ]}
    ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
