import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAuthGuard } from 'src/app/app-auth.guard';
import { ManagerSalePointComponent } from './manager-sale-point/manager-sale-point.component';
import { ManagerComponent } from './manager.component';

const routes: Routes = [{
    path: '', component: ManagerComponent,canActivate:[AppAuthGuard],canActivateChild:[AppAuthGuard],
    children: [
        {path: '', component: ManagerSalePointComponent}
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
