import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAuthGuard } from 'src/app/app-auth.guard';
import { SalePointComponent } from './sale-point/sale-point.component';
import { SaleComponent } from './sale.component';

const routes: Routes = [{
    path: '', component: SaleComponent,
    children: [
        {path: '', component: SalePointComponent},
        ]}
      ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
