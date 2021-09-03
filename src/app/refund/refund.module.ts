import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefundRoutingModule } from './refund-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RefundIndicatorComponent } from './components/refund-indicator/refund-indicator.component';

@NgModule({
  imports: [
    CommonModule,
    RefundRoutingModule
  ],
  exports: [RefundIndicatorComponent],
  declarations: [DashboardComponent, RefundIndicatorComponent]
})
export class RefundModule { }
