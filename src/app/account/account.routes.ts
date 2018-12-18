import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthorizedComponent } from './components/authorized/authorized.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'authorized', component: AuthorizedComponent },
  { path: '**', component: LoginComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
