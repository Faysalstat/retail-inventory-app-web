import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductManagementComponent } from './product-management/product-management.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import { CompsModule } from '../comps/comps.module';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/material.module';
import { TaskListComponent } from './task-list/task-list.component';
import { ApprovalDetailsComponent } from './approval-details/approval-details.component';
import { ConfigurationSettingComponent } from './configuration-setting/configuration-setting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProductManagementComponent,
    TaskListComponent,
    ApprovalDetailsComponent,
    ConfigurationSettingComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PanelMenuModule,
    AdminRoutingModule,
    CompsModule,
    MaterialModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
