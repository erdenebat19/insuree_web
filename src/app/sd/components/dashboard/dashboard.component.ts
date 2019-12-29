import { Component, OnInit } from "@angular/core";
import { ContractService } from "../../shared/contract.service";
import { Router } from "@angular/router";
import { MessageService } from "src/app/notification/shared/message.service";
import { PaymentService } from "../../shared/payment.service";
import { ContactService } from "../../shared/contact.service";
import { ReferenceService } from "../../shared/reference.service";
import { ErrorService } from "src/app/shared/shared/error.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  loading_message = false;
  loading_contract = false;
  loading_payment = false;
  message: string;
  contract: any;
  payment: any;
  expanded: boolean = false;
  selectedPayment: any;
  lastPayment: any;
  transacs: any;
  contact: any;
  loading_contact: boolean;
  contract_moving_error_message: string;
  aimags: any;
  loading_transac: boolean;
  message_error_message: any;
  contract_error_message: string;
  amount: number;

  constructor(
    private contractService: ContractService,
    private messageService: MessageService,
    private paymentService: PaymentService,
    private contactService: ContactService,
    private referenceService: ReferenceService,
    private errorService: ErrorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading_message = true;
    this.messageService
      .GetLast()
      .subscribe(
        result => {
          this.loading_message = false;
          this.message = result;
        },
        error => {
          console.log(error);
          this.message_error_message = this.errorService.getInlineError(error);
        }
      )
      .add(() => {
        this.loading_message = false;
      });
    this.loading_contract = true;
    this.contractService
      .Get()
      .subscribe(
        result => {
          this.loading_contract = false;
          this.contract = result;
        },
        error => {
          this.contract_error_message = this.errorService.getInlineError(error);
        }
      )
      .add(() => {
        this.loading_contract = false;
      });
    this.loading_payment = true;
    this.paymentService
      .Get()
      .subscribe(result => {
        this.loading_payment = false;
        this.payment = result;
      })
      .add(() => {
        this.loading_payment = false;
      });
    this.loading_payment = true;
    this.paymentService
      .GetLastPayment()
      .subscribe(result => {
        this.loading_payment = false;
        this.lastPayment = result;
        this.amount = this.lastPayment.amount;
      })
      .add(() => {
        this.loading_payment = false;
      });
    this.loading_contact = true;
    this.referenceService
      .AimagList()
      .subscribe(result => {
        this.loading_contact = false;
        this.aimags = result;
        this.contactService.Get().subscribe(result => {
          this.contact = result;
        });
      })
      .add(() => {
        this.loading_contact = false;
      });
  }

  selectPayment(item: any) {
    this.expanded = !this.expanded;
    this.selectedPayment = item;
    console.log(this.expanded);
    console.log(this.selectedPayment);
    this.loading_transac = true;
    if (item.Paid > 0) {
      this.paymentService.GetTransac(item.CalYear, item.CalMonth).subscribe(
        result => {
          this.loading_transac = false;
          this.transacs = result;
          console.log(this.transacs);
        },
        error => {
          console.log(error);
          this.loading_transac = false;
        }
      );
    }
  }
  ContractMove() {
    console.log(this.contact.Section.aid);
    this.contract_moving_error_message =
      "Та тооцооны үлдэгдэлтэй байгаа тул таны гэрээг шилжүүлэх боломжгүй байна. Та тооцооны үлдэгдэлгүй болоод дараа шилжүүлэх боломжтой.";
  }
  pay() {
    sessionStorage.setItem("Amount", this.amount.toString());
    this.router.navigate(["main/view/payment"]);
  }
}
