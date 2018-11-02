import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenefitListComponent } from './components/benefit-list/benefit-list.component';
import { BenefitRoutingModule } from './benefit.routes';
import { InlineLoaderModule } from '../shared/ui/inline-loader/inline-loader.module';

@NgModule({
  imports: [
    CommonModule,
    BenefitRoutingModule,
    InlineLoaderModule
  ],
  declarations: [BenefitListComponent],
  exports: [BenefitListComponent]
})
export class BenefitModule { }
