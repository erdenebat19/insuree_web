import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestComponent } from './hchta/components/request/request.component';

const routes: Routes = [
 {
  path: '',
  redirectTo: 'hchta',
  pathMatch: 'full',
 },
 {
  path: 'ja',
  loadChildren: './ja/ja.module#JaModule',
  //   component: RequestComponent,
 },
 {
  path: 'hchta',
  loadChildren: './hchta/hchta.module#HchtaModule',
  //   component: RequestComponent,
 },
];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule],
})
export class MedicalcertRoutingModule {}
