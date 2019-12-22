import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateInvoiceComponent } from "./components/create-invoice/create-invoice.component";
import { ShowQRComponent } from "./components/show-qr/show-qr.component";
import { PaymentRoutingModule } from "./payment.routes";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [CommonModule, PaymentRoutingModule, SharedModule],
  declarations: [CreateInvoiceComponent, ShowQRComponent, DashboardComponent]
})
export class PaymentModule {}
