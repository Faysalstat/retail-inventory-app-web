import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAuthGuard } from 'src/app/app-auth.guard';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductManagementComponent } from './product-management/product-management.component';

const routes: Routes = [{
    // path: '', component: AdminComponent,canActivate:[AppAuthGuard],canActivateChild:[AppAuthGuard],
    path: '', component: AdminComponent,
    children: [
        {path: '', component: DashboardComponent},
        {path: 'product', component: ProductManagementComponent}
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
