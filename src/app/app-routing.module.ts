import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'sale', loadChildren: () => import('./modules/sale/sale.module').then(m => m.SaleModule) },
  { path: 'client', loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule) },
  { path: 'cash', loadChildren: () => import('./modules/cash/cash.module').then(m => m.CashModule) },
  { path: 'supply', loadChildren: () => import('./modules/stock/stock.module').then(m => m.StockModule) },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'manager', loadChildren: () => import('./modules/manager/manager.module').then(m => m.ManagerModule) },
  { path: 'reports', loadChildren: () => import('./modules/report/report.module').then(m => m.ReportModule) }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
