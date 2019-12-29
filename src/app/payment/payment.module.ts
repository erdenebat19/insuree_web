import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateInvoiceComponent } from "./components/create-invoice/create-invoice.component";
import { ShowQRComponent } from "./components/show-qr/show-qr.component";
import { PaymentRoutingModule } from "./payment.routes";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SharedModule } from "../shared/shared.module";
import { InlineLoaderModule } from "../shared/ui/inline-loader/inline-loader.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaymentRoutingModule,
    InlineLoaderModule,
    SharedModule
  ],
  declarations: [CreateInvoiceComponent, ShowQRComponent, DashboardComponent]
})
export class PaymentModule {}
