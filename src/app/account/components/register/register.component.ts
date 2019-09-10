import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../shared/user";
import { AccountService } from "../../shared/account.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css", "../../shared/account.css"]
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  errormessage: string;
  user: User = <User>{};
  success_message: string;
  btn_register_caption: string = "Бүртгүүлэх";
  info_message: string;

  constructor(private router: Router, private _service: AccountService) {}

  ngOnInit() {
    this.info_message =
      'Баталгаажуулалт хийгдсэний дараа нэвтрэх нууц үг бүртгүүлсэн цахим шуудан руу илгээгдэх тул мэдээллээ зөв оруулна уу.<br> <br> ДАН систем ашиглан бүртгүүлэх бол <a style="color: yellow;" href="https://sso.gov.mn/register/">энд дарна</a> уу';
  }

  register() {
    this.loading = true;
    this._service.editregister(this.user).subscribe(
      result => {
        this.loading = false;
        if (result != undefined && result != null) {
          var r: number;
          r = 0;

          result.forEach(item => {
            r = r + item.infoid;
            if (item.infoid == 2) this.errormessage = result[0].infotext;
            if (item.infoid == 1) {
              this.errormessage =
                "Таны мэдээлэл УБЕГ-н мэдээллээс зөрүүтэй байна шалгаад дахин оруулна уу.";
            }
          });
          if (r == 0) {
            var profile = {
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
