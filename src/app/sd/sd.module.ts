import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdRoutingModule } from './sd.routes';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { ContractRegisterComponent } from './components/contract-register/contract-register.component';
import { ContractBalanceComponent } from './components/contract-balance/contract-balance.component';

@NgModule({
  imports: [CommonModule, SdRoutingModule, FormsModule],
  declarations: [DashboardComponent, ContractRegisterComponent, ContractBalanceComponent]
})
export class SdModule {}
