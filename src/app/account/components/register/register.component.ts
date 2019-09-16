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
  isedit: boolean = false;

  constructor(private router: Router, private _service: AccountService) {}

  ngOnInit() {
    this.info_message =
      'Бүртгэл, баталгаажуулалт хийгдсэний дараа таны цахим шуудан руу холбогдох мэдээллийг илгээх тул та өөрийн мэдээллээ үнэн, зөв оруулна уу!<br> <br> ДАН систем ашиглан системд нэвтрэхийг <a style="color: yellow;" href="https://sso.gov.mn/register/">энд дарна</a> уу';
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
            this.errormessage = undefined;
            this.success_message =
              "Амжилттай бүртгэгдлээ. Таны бүртгүүлсэн цахим шуудан руу баталгаажуулалтын хаяг илгээгдсэн тул та уг хаягаар орон өөрийн нэвтрэх эрхээ баталгаажуулж нууц үгээ авна уу. /Хэрэв ирээгүй бол SPAM дотроо шалгана уу/";
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
