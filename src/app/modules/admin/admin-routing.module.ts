import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminAuthGuard } from './admin-auth.guard';
import { AdminComponent } from './admin.component';
import { ApprovalDetailsComponent } from './approval-details/approval-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductConfigComponent } from './product-config/product-config.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [{
    path: '', component: AdminComponent,canActivate:[AdminAuthGuard],canActivateChild:[AdminAuthGuard],
    children: [
        {path: '', component: DashboardComponent},
        {path: 'add-product', component: ProductConfigComponent},
        {path: 'add-user', component: AddUserComponent},
        {path: 'task-list', component: TaskListComponent},
        {path: 'task-details/:id', component: ApprovalDetailsComponent},
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
