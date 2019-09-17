import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../shared/user";
import { AccountService } from "../../shared/account.service";

@Component({
  selector: "app-edit-register",
  templateUrl: "./register.component.html",
  styleUrls: ["../../shared/account.css", "./register.component.css"]
})
export class EditRegisterComponent implements OnInit {
  loading: boolean = false;
  errormessage: string;
  user: User = <User>{};
  success_message: string;
  btn_register_caption: string = "Үргэлжлүүлэх";
  info_message: string;
  isedit: boolean = true;

  constructor(private router: Router, private _service: AccountService) {}

  ngOnInit() {
    if (sessionStorage.getItem("profile") != undefined) {
      var user = JSON.parse(sessionStorage.getItem("profile"));
      this.user.id = user.user_id;
      this.user.RegID = user.register;
      this.user.SurName = user.sur_name;
      this.user.LastName = user.last_name;
      this.user.FirstName = user.first_name;
      this.user.Email = user.login_id;
      this.user.Phone = user.phone;
      this.info_message =
        "Та өөрийн бүртгүүлсэн мэдээллийг хянаж үзээд буруу мэдээлэл байвал засварлана уу.";
    } else {
      this.router.navigate(["/account/register"]);
    }
  }

  register() {
    this.loading = true;
    this._service.editregister(this.user).subscribe(
      result => {
        console.log(result);
        this.loading = false;
        if (result != undefined && result != null) {
          var r: number;
          r = 0;
          result.forEach(item => {
            r = r + item.infoid;
          });
          result.forEach(item => {
            r = r + item.infoid;
            if (item.infoid == 2) {
              this.success_message = undefined;
              this.errormessage = result[0].infotext;
            }
            if (item.infoid == 1) {
              this.success_message = undefined;
              this.errormessage =
                "Таны оруулсан мэдээлэл Улсын бүртгэлийн мэдээллээс зөрүүтэй байна. Та мэдээллээ шалгаад дахин оруулна уу!";
            }
          });
          if (r == 0) {
            var profile = {
              user_id: this.user.id,
              register: this.user.RegID,
              sur_name: this.user.SurName,
              last_name: this.user.LastName,
              first_name: this.user.FirstName,
              login_id: this.user.Email,
              phone: this.user.Phone
            };
            sessionStorage.setItem("profile", JSON.stringify(profile));
            this.router.navigate(["/account/confirm1"]);
          }
        }
      },
      error => {
        this.loading = false;
        if (error.status == 0) {
          this.router.navigate(["/error"]);
        } else {
          this.errormessage = error.message;
        }
      }
    );
  }
}
