import { Component, OnInit } from "@angular/core";
import { ContractService } from "../../shared/contract.service";
import { ErrorService } from "src/app/shared/shared/error.service";

@Component({
  selector: "app-contract-register-payment",
  templateUrl: "./contract-register-payment.component.html",
  styleUrls: ["./contract-register-payment.component.css"]
})
export class ContractRegisterPaymentComponent implements OnInit {
  payment: any[];
  amount: number;
  PayMonth: number;
  contract: any;
  error_message: any;

  constructor(
    private contractService: ContractService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.contractService.Get().subscribe(result => {
      console.log(result);
      this.contract = result;
      if (!this.contract) {
        this.error_message = "Гэрээ бүртгээгүй байна";
      }
      this.payment = [];
      this.PayMonth = 1;
      this.contractService.GetPreSchedule().subscribe(
        result => {
          result.forEach(item => {
            this.payment.push({
              PayDate: new Date(item.calYear, item.calMonth, 1),
              Amount: item.dun,
              ischecked: false
            });
          });
          if (this.payment.length > 0) {
            this.payment[0].ischecked = true;
            this.amount = this.payment[0].Amount;
          }
        },
        error => {
          this.error_message = this.errorService.getInlineError(error);
        }
      );
    });
  }
  calc() {
    this.amount = 0;
    this.payment.forEach(i => {
      i.ischecked = false;
    });
    for (let i = 0; i < this.PayMonth; i++) {
      this.payment[i].ischecked = true;
      this.amount = this.amount + this.payment[i].Amount;
    }
  }
}
