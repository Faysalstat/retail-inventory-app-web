import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { TreansactionReportComponent } from './treansaction-report/treansaction-report.component';
import { CompsModule } from '../comps/comps.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';


@NgModule({
  declarations: [
    ReportComponent,
    TreansactionReportComponent
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
