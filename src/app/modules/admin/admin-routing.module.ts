import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ApprovalDetailsComponent } from './approval-details/approval-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { SupplyerManagementComponent } from './supplyer-management/supplyer-management.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [{
    // path: '', component: AdminComponent,canActivate:[AppAuthGuard],canActivateChild:[AppAuthGuard],
    path: '', component: AdminComponent,
    children: [
        {path: '', component: DashboardComponent},
        {path: 'product', component: ProductManagementComponent},
        {path: 'task-list', component: TaskListComponent},
        {path: 'task-details/:id', component: ApprovalDetailsComponent},
        //test rout
        { path:'supplyer', component:SupplyerManagementComponent}
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
