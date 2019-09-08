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
    this._service.register(this.user).subscribe(
      result => {
        this.loading = false;
        if (result) {
          if (result == 1) {
            this.errormessage = undefined;
            sessionStorage.setItem("profile", JSON.stringify(this.user));
            //this.success_message = 'Хүсэлтийг хүлээн авлаа. Та өөрт ойр байрлах Нийгмийн даатгалын хэлтэс дээр иргэний үнэмлэхтэйгээ очиж бүртгэлээ баталгаажуулна уу!';
            this.router.navigate(["/account/confirm1"]);
          }
          if (result == 0) {
            this.success_message = undefined;
            this.errormessage = "Бүртгэлтэй хэрэглэгч байна!";
          } else if (result != 1) {
            this.success_message = undefined;
            this.router.navigate(["/error"]);
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
