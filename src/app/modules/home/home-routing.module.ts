import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAuthGuard } from '../app-auth.guard';
import { HomeComponent } from './home.component';

const routes: Routes = [{
    path: '', component: HomeComponent,canActivate:[AppAuthGuard],
    children: [
        {path: '', component: HomeComponent},
        ]}
      ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
