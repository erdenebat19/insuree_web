import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainPageComponent } from "./main-page/main-page.component";
import { SharedModule } from "../shared/shared.module";
import { SidebarModule } from "../shared/ui/sidebar/sidebar.module";
import { RouterModule } from "@angular/router";
import { routes } from "./main-view.routes";

@NgModule({
  imports: [
    CommonModule,
    SidebarModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MainPageComponent]
})
export class MainViewModule {}
