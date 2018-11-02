import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PentionAccountListComponent } from './components/pention-account-list/pention-account-list.component';
import { PentionAccountBalanceComponent } from './components/pention-account-balance/pention-account-balance.component';
import { PentionAccountBalanceGraphComponent } from './components/pention-account-balance-graph/pention-account-balance-graph.component';
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
  declarations: [DashboardComponent, PentionAccountListComponent, PentionAccountBalanceComponent, PentionAccountBalanceGraphComponent],
  exports: [DashboardComponent]
})
export class PentionAccountModule { }
