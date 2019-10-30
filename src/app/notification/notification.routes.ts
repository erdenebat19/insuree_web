import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { MessageListComponent } from "./components/message-list/message-list.component";

export const routes: Routes = [
  { path: "", component: MessageListComponent },
  { path: "list", component: MessageListComponent },
  { path: "**", component: MessageListComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
