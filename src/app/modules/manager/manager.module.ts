import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerSalePointComponent } from './manager-sale-point/manager-sale-point.component';
import { ManagerRoutingModule } from './manager-routing.module';



@NgModule({
  declarations: [
    ManagerSalePointComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }
