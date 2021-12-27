import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalcertRoutingModule } from './medicalcert-routing.module';
import { InlineLoaderModule } from '../shared/ui/inline-loader/inline-loader.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
 imports: [CommonModule, MedicalcertRoutingModule, InlineLoaderModule, FormsModule, SharedModule],
 declarations: [],
})
export class MedicalcertModule {}
