import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { FormsModule } from "@angular/forms";
import { AlertComponent } from "./ui/alert/alert.component";
import { NotificationComponent } from "./ui/notification/notification.component";
import { AlertInlineComponent } from "./ui/alert-inline/alert-inline.component";
import { ModalComponent } from "./ui/modal/modal.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    ChangePasswordComponent,
    AlertComponent,
    NotificationComponent,
    AlertInlineComponent,
    ModalComponent
  ],
  exports: [
    ChangePasswordComponent,
    AlertComponent,
    NotificationComponent,
    AlertInlineComponent,
    ModalComponent
  ]
})
export class SharedModule {}
