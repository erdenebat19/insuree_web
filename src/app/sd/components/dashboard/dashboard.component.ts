import { Component, OnInit } from "@angular/core";
import { ContractService } from "../../shared/contract.service";
import { Router } from "@angular/router";
import { MessageService } from "src/app/notification/shared/message.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  loading: boolean = false;
  message: string;
  contract: any;
  constructor(
    private contractService: ContractService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.messageService.GetLast().subscribe(
      result => {
        this.loading = false;
        this.message = result;
      },
      error => {
        this.loading = true;
      }
    );
    this.contractService.Get().subscribe(
      result => {
        this.loading = false;
        this.contract = result;
      },
      error => {
        this.loading = true;
      }
    );
    // this.contractService.GetStatus().subscribe(
    //   result => {
    //     this.loading = false;
    //     let status = result.Status;
    //     switch (status) {
    //       case 1:
    //         this.router.navigate(["/main/view/sd/register"]);
    //         break;
    //       default:
    //         this.router.navigate(["/main/view/sd/404"]);
    //         break;
    //     }
    //   },
    //   error => {
    //     this.loading = false;
    //   }
    // );
  }
}
