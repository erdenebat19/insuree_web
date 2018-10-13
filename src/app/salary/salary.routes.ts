import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SalaryListComponent } from './components/salary-list/salary-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  { path: 'list', component: SalaryListComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class SalaryRoutingModule { }
