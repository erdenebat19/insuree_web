import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SdRoutingModule } from "./sd.routes";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { FormsModule } from "@angular/forms";
import { ContractRegisterComponent } from "./components/contract-register/contract-register.component";
import { ContractBalanceComponent } from "./components/contract-balance/contract-balance.component";
import { ConfirmContractRegisterComponent } from "./components/confirm-contract-register/confirm-contract-register.component";
import { NgxMaskModule } from "ngx-mask";
import { InlineLoaderModule } from "../shared/ui/inline-loader/inline-loader.module";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { ContractRegisterPaymentComponent } from "./components/contract-register-payment/contract-register-payment.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SdRoutingModule,
    FormsModule,
    InlineLoaderModule,
    NgxMaskModule.forRoot(),
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    ContractRegisterComponent,
    ContractBalanceComponent,
    ConfirmContractRegisterComponent,
    NotFoundComponent,
    ContractRegisterPaymentComponent
  ]
})
export class SdModule {}
