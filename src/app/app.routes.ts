import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './core/auth.guard';

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
    path: '',
    redirectTo: 'salary/list',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
