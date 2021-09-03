import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../core/auth.guard';
import { MainPageComponent } from './main-page/main-page.component';
import { ChangePasswordComponent } from '../shared/components/change-password/change-password.component';

export const routes: Routes = [
  {
    path: 'view',
    component: MainPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'salary',
        loadChildren: '../salary/salary.module#SalaryModule'
      },
      {
        path: 'pention',
        loadChildren: '../pention/pention.module#PentionModule'
      },
      {
        path: 'benefit',
        loadChildren: '../benefit/benefit.module#BenefitModule'
      },
      {
        path: 'ndans',
        loadChildren:
          '../pention-account/pention-account.module#PentionAccountModule'
      },
      {
        path: 'sd',
        loadChildren: '../sd/sd.module#SdModule'
      },
      {
        path: 'socialbook',
        loadChildren: '../social-book/social-book.module#SocialBookModule'
      },
      {
        path: 'payment',
        loadChildren: '../payment/payment.module#PaymentModule'
      },
      {
        path: 'refund',
        loadChildren: '../refund/refund.module#RefundModule'
      },
      {
        path: 'emd',
        loadChildren: '../emd/emd.module#EmdModule'
      },
      {
        path: 'message',
        loadChildren: '../notification/notification.module#NotificationModule'
      },
      {
        path: 'change_password',
        component: ChangePasswordComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'view/salary',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainViewRoutingModule {}
