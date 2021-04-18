import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { AccountRoutingModule } from './account.routes';
import { FormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { AuthorizedComponent } from './components/authorized/authorized.component';
import { EditRegisterComponent } from './components/register/edit-register.component';
import { ConfirmStep1Component } from './components/confirm-step1/confirm-step1.component';
import { ConfirmStep2Component } from './components/confirm-step2/confirm-step2.component';
import { InlineLoaderModule } from '../shared/ui/inline-loader/inline-loader.module';
import { ValidateComponent } from './components/validate/validate.component';
import { RegisterSwitchComponent } from './components/register-switch/register-switch.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    RecaptchaModule,
    InlineLoaderModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    EditRegisterComponent,
    ResetpasswordComponent,
    AuthorizedComponent,
    ConfirmStep1Component,
    ConfirmStep2Component,
    ValidateComponent,
    RegisterSwitchComponent
  ],
  exports: [LoginComponent, RegisterComponent, ResetpasswordComponent]
})
export class AccountModule {}
