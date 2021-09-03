import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ErrorReportComponent } from './shared/ui/error-report/error-report.component';

export const routes: Routes = [
  {
    path: 'account',
    loadChildren: './account/account.module#AccountModule'
  },
  {
    path: 'main',
    loadChildren: './main-view/main-view.module#MainViewModule'
  },
  {
    path: 'error',
    component: ErrorReportComponent
  },
  {
    path: '',
    redirectTo: 'main/view/salary',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
