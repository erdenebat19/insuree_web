import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './components/info/info.component';
import { OlgoltComponent } from './components/olgolt/olgolt.component';
import { HistoryComponent } from './components/history/history.component';
import { SalaryComponent } from './components/salary/salary.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { PentionRoutingModule } from './pention.routes';
import { InlineLoaderModule } from '../shared/ui/inline-loader/inline-loader.module';
import { PentionStatementComponent } from './components/pention-statement/pention-statement.component';

@NgModule({
  imports: [
    CommonModule,
    PentionRoutingModule,
    FormsModule,
    InlineLoaderModule
  ],
  declarations: [
    InfoComponent,
    OlgoltComponent,
    HistoryComponent,
    SalaryComponent,
    DashboardComponent,
    PentionStatementComponent
  ],
  exports: [
    InfoComponent,
    OlgoltComponent,
    HistoryComponent,
    SalaryComponent,
    DashboardComponent
  ],
  entryComponents: [
    InfoComponent,
    OlgoltComponent,
    HistoryComponent,
    SalaryComponent
  ]
})
export class PentionModule { }
