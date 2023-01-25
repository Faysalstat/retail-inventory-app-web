import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminAuthGuard } from './admin-auth.guard';
import { AdminComponent } from './admin.component';
import { ApprovalDetailsComponent } from './approval-details/approval-details.component';
import { CashApprovalDetailsComponent } from './cash-approval-details/cash-approval-details.component';
import { ConfigurationSettingComponent } from './configuration-setting/configuration-setting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductConfigComponent } from './product-config/product-config.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [{
    path: '', component: AdminComponent,canActivate:[AdminAuthGuard],canActivateChild:[AdminAuthGuard],
    children: [
        {path: '', component: DashboardComponent},
        {path: 'dashboard', component: DashboardComponent},
        {path: 'add-product', component: ProductConfigComponent},
        {path: 'add-config', component: ConfigurationSettingComponent},
        {path: 'add-user', component: AddUserComponent},
        {path: 'add-employee', component: AddEmployeeComponent},
        {path: 'task-list', component: TaskListComponent},
        {path: 'product-stock', component: ProductManagementComponent},
        {path: 'product-detail/:id', component: ProductConfigComponent},
        {path: 'task-details/:id', component: ApprovalDetailsComponent},
        {path: 'tnx-task-details/:id', component: CashApprovalDetailsComponent},
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
