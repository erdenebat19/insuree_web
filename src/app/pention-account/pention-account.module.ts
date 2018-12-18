import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InlineLoaderModule } from '../shared/ui/inline-loader/inline-loader.module';
import { PentionAccountRoutingModule } from './pention-account.routes';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [
    CommonModule,
    InlineLoaderModule,
    PentionAccountRoutingModule,
    ChartModule 
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class PentionAccountModule { }
