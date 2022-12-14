import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ApprovalDetailsComponent } from './approval-details/approval-details.component';
import { ProductConfigComponent } from './product-config/product-config.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [{
    // path: '', component: AdminComponent,canActivate:[AppAuthGuard],canActivateChild:[AppAuthGuard],
    path: '', component: AdminComponent,
    children: [
        {path: 'add-product', component: ProductConfigComponent},
        {path: 'task-list', component: TaskListComponent},
        {path: 'product-list', component: ProductManagementComponent},
        {path: 'task-details/:id', component: ApprovalDetailsComponent},
        {path: 'product-detail/:id', component: ProductConfigComponent}
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
