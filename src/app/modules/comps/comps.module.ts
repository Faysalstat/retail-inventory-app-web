import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';
import { MatIconModule } from '@angular/material/icon';
import { AddPersonComponent } from './add-person/add-person.component';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { AddStockComponent } from './add-stock/add-stock.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CashComponent } from './cash/cash.component';
import { AddSupplyerComponent } from './add-supplyer/add-supplyer.component';

const components = [AddProductComponent,AddPersonComponent,PageLoaderComponent,AddStockComponent,
  AddCustomerComponent,CashComponent,AddSupplyerComponent
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MatIconModule,
    FormsModule
  ],
  exports: components
})
export class CompsModule { }
