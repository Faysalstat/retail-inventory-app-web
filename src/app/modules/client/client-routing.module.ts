import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSupplyerComponent } from '../comps/add-supplyer/add-supplyer.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientComponent } from './client.component';

const routes: Routes = [{
    path: '', component: ClientComponent,
    children: [
        {path: 'client-list', component: ClientListComponent},
        {path: 'add-supplyer', component: AddSupplyerComponent},
        {path: 'client-details/:id', component: ClientDetailsComponent},
        ]}
      ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
