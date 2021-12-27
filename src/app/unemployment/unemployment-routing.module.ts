import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RequestComponent } from './components/request/request.component';

const routes: Routes = [
 {
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full',
  //   component: DashboardComponent,
 },
 {
  path: '',
  redirectTo: 'request',
  pathMatch: 'full',
  //   component: DashboardComponent,
 },
 { path: 'dashboard', component: DashboardComponent },
 { path: 'request', component: RequestComponent },
];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule],
})
export class UnemploymentRoutingModule {}
