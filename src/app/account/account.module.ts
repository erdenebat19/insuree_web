import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { AccountRoutingModule } from './account.routes';
import { FormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    RecaptchaModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetpasswordComponent,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ResetpasswordComponent,
  ]
})
export class AccountModule { }
