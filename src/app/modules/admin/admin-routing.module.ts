import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAssetsComponent } from '../comps/add-assets/add-assets.component';
import { AddLoanAccComponent } from '../comps/add-loan-acc/add-loan-acc.component';
import { AddEmployeePanelComponent } from './add-employee-panel/add-employee-panel.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminComponent } from './admin.component';
import { ApprovalDetailsComponent } from './approval-details/approval-details.component';
import { AssetsManagementComponent } from './assets-management/assets-management.component';
import { CashApprovalDetailsComponent } from './cash-approval-details/cash-approval-details.component';
import { ConfigurationSettingComponent } from './configuration-setting/configuration-setting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { LoanApprovalDetailsComponent } from './loan-approval-details/loan-approval-details.component';
import { ProductConfigComponent } from './product-config/product-config.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ProfitCalculationComponent } from './profit-calculation/profit-calculation.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AdminAuthGuard } from '../services/admin-auth.guard';
import { ManagerAuthGuard } from '../services/manager-auth.guard';
import { AppAuthGuard } from '../app-auth.guard';

const routes: Routes = [{
    path: '', component: AdminComponent,canActivate:[ManagerAuthGuard],
    children: [
        {path: '', component: DashboardComponent},
        {path: 'dashboard', component: DashboardComponent},
        {path: 'assets', component: AssetsManagementComponent,canActivate :[AdminAuthGuard]},
        {path: 'add-product', component: ProductConfigComponent,canActivate :[AdminAuthGuard]},
        {path: 'add-config', component: ConfigurationSettingComponent,canActivate :[AdminAuthGuard]},
        {path: 'add-asset', component: AddAssetsComponent,canActivate :[AdminAuthGuard]},
        {path: 'add-user', component: AddUserComponent,canActivate :[AdminAuthGuard]},
        {path: 'add-loan-acc', component: AddLoanAccComponent,canActivate :[AdminAuthGuard]},
        {path: 'add-employee', component: AddEmployeePanelComponent,canActivate :[AdminAuthGuard]},
        {path: 'employee-list', component: EmployeeManagementComponent},
        {path: 'product-stock', component: ProductManagementComponent,canActivate :[AdminAuthGuard]},
        {path: 'product-detail/:id', component: ProductConfigComponent},
        {path: 'task-list', component: TaskListComponent},
        {path: 'task-details/:id', component: ApprovalDetailsComponent},
        {path: 'tnx-task-details/:id', component: CashApprovalDetailsComponent},
        {path: 'loan-task-details/:id', component: LoanApprovalDetailsComponent},
        {path: 'employee-details/:id', component: EmployeeDetailsComponent},
        {path: 'profit-calculation', component: ProfitCalculationComponent,canActivate :[AdminAuthGuard]},
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
