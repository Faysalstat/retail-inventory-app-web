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
import { ProductConfigComponent } from './product-config/product-config.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminAuthGuard } from './admin-auth.guard';
import { CashApprovalDetailsComponent } from './cash-approval-details/cash-approval-details.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AddEmployeePanelComponent } from './add-employee-panel/add-employee-panel.component';
import { AssetsManagementComponent } from './assets-management/assets-management.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProductManagementComponent,
    TaskListComponent,
    ApprovalDetailsComponent,
    ConfigurationSettingComponent,
    AdminComponent,
    ProductConfigComponent,
    AddUserComponent,
    DashboardComponent,
    CashApprovalDetailsComponent,
    EmployeeManagementComponent,
    EmployeeDetailsComponent,
    AddEmployeePanelComponent,
    AssetsManagementComponent
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
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
