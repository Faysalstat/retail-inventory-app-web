import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductManagementComponent } from './product-management/product-management.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import { CompsModule } from '../comps/comps.module';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/material.module';


@NgModule({
  declarations: [
    DashboardComponent,
    ProductManagementComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PanelMenuModule,
    AdminRoutingModule,
    CompsModule,
    MaterialModule,
    MatIconModule
  ]
})
export class AdminModule { }
