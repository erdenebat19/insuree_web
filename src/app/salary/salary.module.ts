import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryRoutingModule } from './salary.routes';
import { FormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { InlineLoaderModule } from '../shared/ui/inline-loader/inline-loader.module';
import { SalaryListComponent } from './components/salary-list/salary-list.component';

@NgModule({
  imports: [
    CommonModule,
    SalaryRoutingModule,
    FormsModule,
    RecaptchaModule,
    InlineLoaderModule
  ],
  declarations: [SalaryListComponent],
  exports: [SalaryListComponent]
})
export class SalaryModule { }
