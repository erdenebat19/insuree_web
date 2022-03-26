import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JaRoutingModule } from './ja-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RequestComponent } from './components/request/request.component';
import { InlineLoaderModule } from '../../shared/ui/inline-loader/inline-loader.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
 imports: [CommonModule, FormsModule, SharedModule, JaRoutingModule, InlineLoaderModule, QRCodeModule],
 declarations: [DashboardComponent, RequestComponent],
})
export class JaModule {}
