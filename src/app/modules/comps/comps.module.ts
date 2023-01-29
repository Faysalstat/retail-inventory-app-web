import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';
import { MatIconModule } from '@angular/material/icon';
import { AddPersonComponent } from './add-person/add-person.component';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CashReceiveComponent } from './cash-receive/cash-receive.component';
import { AddSupplyerComponent } from './add-supplyer/add-supplyer.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { PointOfSaleComponent } from './point-of-sale/point-of-sale.component';
import { AddTnxReasonComponent } from './add-tnx-reason/add-tnx-reason.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { UnitTypeComponent } from './unit-type/unit-type.component';
import { AddPackagingCategoryComponent } from './add-packaging-category/add-packaging-category.component';
import { ExpenseComponent } from './expense/expense.component';
import { PayrollComponent } from './payroll/payroll.component';
import { DepositComponent } from './deposit/deposit.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { SalaryExpenseComponent } from './salary-expense/salary-expense.component';

const components = [AddProductComponent,AddPersonComponent,PageLoaderComponent,
  AddCustomerComponent,CashReceiveComponent,AddSupplyerComponent,MenuBarComponent,PointOfSaleComponent,
  AddTnxReasonComponent,ProductCategoryComponent,UnitTypeComponent,AddPackagingCategoryComponent,
  ExpenseComponent,PayrollComponent,DepositComponent,AddEmployeeComponent,SalaryExpenseComponent]

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
