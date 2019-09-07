import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "../../shared/account.service";

@Component({
  selector: "app-confirm-step1",
  templateUrl: "./confirm-step1.component.html",
  styleUrls: ["./confirm-step1.component.css"]
})
export class ConfirmStep1Component implements OnInit {
  regid: string;
  rorgs: any[];
  selectedOrg: any;
  errormessage: string;
  loading: boolean;
  constructor(private router: Router, private service: AccountService) {}

  ngOnInit() {
    this.loading = true;
    if (sessionStorage.getItem("profile") != undefined) {
      this.regid = JSON.parse(sessionStorage.getItem("profile")).register;
      if (localStorage.getItem("rorgs") == undefined) {
        this.service.getRandomOrgs(this.regid).subscribe(
          result => {
            console.log(result);
            this.loading = false;
            this.rorgs = result;
            localStorage.setItem("rorgs", JSON.stringify(this.rorgs));
          },
          error => {
            this.loading = false;
            console.log(error);
            this.router.navigate(["/error"]);
          }
        );
      } else {
        this.loading = false;
        this.rorgs = JSON.parse(localStorage.getItem("rorgs"));
      }
    } else {
      this.loading = false;
      this.router.navigate(["/account/register"]);
    }
  }

  goto_next() {
    if (this.selectedOrg == undefined) {
      this.errormessage = "Байгууллага сонгоогүй байна.";
    } else {
      sessionStorage.setItem(
        "selectedOrg",
        JSON.stringify(this.rorgs.find(x => x.oid == this.selectedOrg))
      );
      this.router.navigate(["/account/confirm2"]);
    }
  }
}
