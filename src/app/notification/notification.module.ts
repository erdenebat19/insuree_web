import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessageListComponent } from "./components/message-list/message-list.component";
import { InlineLoaderModule } from "../shared/ui/inline-loader/inline-loader.module";
import { routes } from "./notification.routes";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [CommonModule, InlineLoaderModule, RouterModule.forChild(routes)],
  declarations: [MessageListComponent]
})
export class NotificationModule {}
