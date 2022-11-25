import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAuthGuard } from 'src/app/app-auth.guard';
import { CashTransactionComponent } from './cash-transaction/cash-transaction.component';
import { ClientManagementComponent } from './client-management/client-management.component';
import { ManagerSalePointComponent } from './manager-sale-point/manager-sale-point.component';
import { ManagerComponent } from './manager.component';

const routes: Routes = [{
    path: '', component: ManagerComponent,
    children: [
        {path: '', component: ManagerSalePointComponent},
        {path: 'add-client', component: ClientManagementComponent},
        {path: 'cash', component: CashTransactionComponent}
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
