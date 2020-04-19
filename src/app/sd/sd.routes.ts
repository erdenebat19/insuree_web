import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContractRegisterComponent } from './components/contract-register/contract-register.component';
import { ConfirmContractRegisterComponent } from './components/confirm-contract-register/confirm-contract-register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ContractRegisterPaymentComponent } from './components/contract-register-payment/contract-register-payment.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: ContractRegisterComponent },
  { path: 'extend', component: ContractRegisterComponent },
  { path: 'register-payment', component: ContractRegisterPaymentComponent },
  { path: 'confirm', component: ConfirmContractRegisterComponent },
  { path: '404', component: NotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SdRoutingModule {}
