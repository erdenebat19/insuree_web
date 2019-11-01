import { Component, OnInit } from "@angular/core";
import { ContractService } from "../../shared/contract.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  loading: boolean = false;
  constructor(private service: ContractService, private router: Router) {}

  ngOnInit() {
    this.loading = true;
    // this.service.GetStatus().subscribe(
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
