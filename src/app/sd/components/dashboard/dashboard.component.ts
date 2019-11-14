import { Component, OnInit } from "@angular/core";
import { ContractService } from "../../shared/contract.service";
import { Router } from "@angular/router";
import { MessageService } from "src/app/notification/shared/message.service";
import { PaymentService } from "../../shared/payment.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  loading_message: boolean = false;
  loading_contract: boolean = false;
  loading_payment: boolean = false;
  message: string;
  contract: any;
  payment: any;
  expanded: boolean;
  selectedPayment: any;
  lastPayment: any;
  transacs: any;

  constructor(
    private contractService: ContractService,
    private messageService: MessageService,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading_message = true;
    this.messageService.GetLast().subscribe(
      result => {
        this.loading_message = false;
        this.message = result;
      },
      error => {
        this.loading_message = true;
      }
    );
    this.contractService.Get().subscribe(
      result => {
        this.loading_contract = false;
        this.contract = result;
      },
      error => {
        this.loading_contract = true;
      }
    );
    this.paymentService.Get().subscribe(
      result => {
        this.loading_payment = false;
        this.payment = result;
      },
      error => {
        this.loading_payment = true;
      }
    );
    this.paymentService.GetLastPayment().subscribe(
      result => {
        this.loading_payment = false;
        this.lastPayment = result;
      },
      error => {
        this.loading_payment = true;
      }
    );
  }

  selectPayment(item: any) {
    this.expanded = !this.expanded;
    this.selectedPayment = item;
    if (item.Paid > 0) {
      this.paymentService.GetTransac(item.CalYear, item.CalMonth).subscribe(
        result => {
          // this.loading_transac = false;
          this.transacs = result;
        },
        error => {
          console.log(error);
          // this.loading_transac = true;
        }
      );
    }
  }
}
