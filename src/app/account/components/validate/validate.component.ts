import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService } from "../../shared/account.service";

@Component({
  selector: "app-validate",
  templateUrl: "./validate.component.html",
  styleUrls: ["./validate.component.css"]
})
export class ValidateComponent implements OnInit {
  loading: boolean;
  info_message: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AccountService
  ) {}

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get("id");
    var val = this.route.snapshot.paramMap.get("val");
    this.loading = true;
    this.service.getProfile(id, val).subscribe(
      result => {
        sessionStorage.setItem("profile", JSON.stringify(result));
        if (result != undefined && result != null) {
          this.router.navigate(["/account/editregister"]);
        } else {
          this.info_message = "Баталгаажуулах хаяг буруу байна.";
        }
      },
      error => {
        this.router.navigate(["/error"]);
      }
    );
  }
}
