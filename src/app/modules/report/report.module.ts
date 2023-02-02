import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { TreansactionReportComponent } from './treansaction-report/treansaction-report.component';
import { CompsModule } from '../comps/comps.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { StockReportComponent } from './stock-report/stock-report.component';
import { SupplyReportComponent } from './supply-report/supply-report.component';
import { ProductReportComponent } from './product-report/product-report.component';
import { LoanReportComponent } from './loan-report/loan-report.component';


@NgModule({
  declarations: [
    ReportComponent,
    TreansactionReportComponent,
    SalesReportComponent,
    StockReportComponent,
    SupplyReportComponent,
    ProductReportComponent,
    LoanReportComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CompsModule
  ]
})
export class ReportModule { }
