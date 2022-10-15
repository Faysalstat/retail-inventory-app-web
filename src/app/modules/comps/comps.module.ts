import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';
import { MatIconModule } from '@angular/material/icon';
import { SaleInvoiceComponent } from './sale-invoice/sale-invoice.component';
import { AddPersonComponent } from './add-person/add-person.component';

const components = [AddProductComponent,SaleInvoiceComponent,AddPersonComponent]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MatIconModule
  ],
  exports: components
})
export class CompsModule { }
