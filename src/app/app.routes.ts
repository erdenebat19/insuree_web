import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './core/auth.guard';
import { ErrorReportComponent } from './shared/ui/error-report/error-report.component';
import { ChangePasswordComponent } from './shared/components/change-password/change-password.component';

export const routes: Routes = [
  {
    path: 'account',
    loadChildren: './account/account.module#AccountModule'
  },
  {
    path: 'salary',
    loadChildren: './salary/salary.module#SalaryModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'pention',
    loadChildren: './pention/pention.module#PentionModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'benefit',
    loadChildren: './benefit/benefit.module#BenefitModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'ndans',
    loadChildren:
      './pention-account/pention-account.module#PentionAccountModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'sd',
    loadChildren: './sd/sd.module#SdModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'change_password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'error',
    component: ErrorReportComponent
  },
  {
    path: '',
    redirectTo: 'salary/list',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
