import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BenefitListComponent } from './components/benefit-list/benefit-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  { path: 'list', component: BenefitListComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class BenefitRoutingModule { }
