import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialBookRoutingModule } from './social-book-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InlineLoaderModule } from '../shared/ui/inline-loader/inline-loader.module';

@NgModule({
  imports: [
    CommonModule,
    SocialBookRoutingModule,
    InlineLoaderModule
  ],
  declarations: [DashboardComponent]
})
export class SocialBookModule { }
