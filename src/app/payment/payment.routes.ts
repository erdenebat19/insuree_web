import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreateInvoiceComponent } from './components/create-invoice/create-invoice.component';
import { ShowQRComponent } from './components/show-qr/show-qr.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create', component: CreateInvoiceComponent },
  { path: 'showqpay', component: ShowQRComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule {}
