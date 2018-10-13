import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineLoaderComponent } from './inline-loader.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [InlineLoaderComponent],
  exports: [InlineLoaderComponent]
})
export class InlineLoaderModule { }
