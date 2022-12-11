import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';
import { AddSupplyerComponent } from './add-supplyer/add-supplyer.component';
import { MaterialModule } from 'src/material.module';
import { CompsModule } from '../comps/comps.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ClientListComponent } from './client-list/client-list.component';
import { SupplyerComponent } from './supplyer/supplyer.component';
import { CustomerComponent } from './customer/customer.component';
import { EmployeeComponent } from './employee/employee.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';



@NgModule({
  declarations: [
    ClientComponent,
    AddSupplyerComponent,
    ClientListComponent,
    SupplyerComponent,
    CustomerComponent,
    EmployeeComponent,
    ClientDetailsComponent,
    CustomerDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CommonModule,
    CompsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    ClientRoutingModule
  ],
  
})
export class ClientModule { }
