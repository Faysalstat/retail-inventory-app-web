import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report.component';
import { TreansactionReportComponent } from './treansaction-report/treansaction-report.component';

const routes: Routes = [{
  path: '', component: ReportComponent,
  children: [
      {path: 'transaction-report', component: TreansactionReportComponent},
      ]}
    ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
