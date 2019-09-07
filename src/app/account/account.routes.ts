import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ResetpasswordComponent } from "./components/resetpassword/resetpassword.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthorizedComponent } from "./components/authorized/authorized.component";
import { EditRegisterComponent } from "./components/register/edit-register.component";
import { ConfirmStep1Component } from "./components/confirm-step1/confirm-step1.component";
import { ConfirmStep2Component } from "./components/confirm-step2/confirm-step2.component";
import { ValidateComponent } from "./components/validate/validate.component";

export const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "editregister", component: EditRegisterComponent },
  { path: "resetpassword", component: ResetpasswordComponent },
  { path: "authorized", component: AuthorizedComponent },
  { path: "confirm1", component: ConfirmStep1Component },
  { path: "confirm2", component: ConfirmStep2Component },
  { path: "validate/:id/:val", component: ValidateComponent },
  { path: "**", component: LoginComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
