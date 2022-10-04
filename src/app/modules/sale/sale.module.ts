import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalePointComponent } from './sale-point/sale-point.component';
import { SaleRoutingModule } from './sale-routing.module';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SalePointComponent
  ],
  imports: [
    CommonModule,
    SaleRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SaleModule { }
