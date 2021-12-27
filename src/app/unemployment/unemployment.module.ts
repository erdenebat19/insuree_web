import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnemploymentRoutingModule } from './unemployment-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RequestComponent } from './components/request/request.component';
import { InlineLoaderModule } from '../shared/ui/inline-loader/inline-loader.module';
// import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
 imports: [CommonModule, FormsModule, SharedModule, UnemploymentRoutingModule, InlineLoaderModule],
 declarations: [DashboardComponent, RequestComponent],
})
export class UnemploymentModule {}
