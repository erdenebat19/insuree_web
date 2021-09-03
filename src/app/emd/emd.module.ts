import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmdRoutingModule } from './emd-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InlineLoaderModule } from '../shared/ui/inline-loader/inline-loader.module';

@NgModule({
  imports: [
    CommonModule,
    EmdRoutingModule,
    InlineLoaderModule
  ],
  declarations: [DashboardComponent]
})
export class EmdModule { }
