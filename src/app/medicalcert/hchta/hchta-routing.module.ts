import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { RequestComponent } from './components/request/request.component';

const routes: Routes = [
 {
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full',
 },
 { path: 'dashboard', component: DashboardComponent },
 { path: 'request', component: RequestComponent },
];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule],
})
export class HchtaRoutingModule {}
