import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "../../shared/account.service";

@Component({
  selector: "app-confirm-step2",
  templateUrl: "./confirm-step2.component.html",
  styleUrls: ["./confirm-step2.component.css", "../../shared/account.css"]
})
export class ConfirmStep2Component implements OnInit {
  date: Date;
  org: any;
  pholder: string;
  loading: boolean;
  info_message: string;
  errormessage: string;
  regid: string;
  email: string;
  dun: number;
  success_message: string;

  constructor(private router: Router, private service: AccountService) {}

  ngOnInit() {
    this.loading = true;
    if (
      localStorage.getItem("selectedOrg") == undefined ||
      localStorage.getItem("selectedOrg") == null
    ) {
      this.router.navigate(["/account/confirm1"]);
    } else {
      this.regid = JSON.parse(sessionStorage.getItem("profile")).register;
      this.email = JSON.parse(sessionStorage.getItem("profile")).login_id;
      this.org = JSON.parse(localStorage.getItem("selectedOrg"));
      this.service.getLastDate(this.regid, this.org.oid).subscribe(
        result => {
          this.loading = false;
          this.date = new Date(result);
          this.date.setDate(this.date.getDate() + 3);
          if (this.org.oid == 1) {
            this.info_message =
              "Та " +
              this.date.getFullYear() +
              " оны " +
              (this.date.getMonth() + 1) +
              " сард сайн дурын даатгалд төлсөн мөнгөн дүнгээ оруулна уу.";
            this.pholder = "Төлсөн шимтгэл";
          } else {
            this.info_message =
              "Та " +
              this.org.orgName +
              " байгууллагад " +
              this.date.getFullYear() +
              " оны " +
              (this.date.getMonth() + 1) +
              " сард авсан цалингийн дүнгээ оруулна уу.";
            this.pholder = "Цалин";
          }
          this.info_message =
            this.info_message +
            " Хэрэв та 3 удаа буруу оруулах юм бол өөрт ойр байрлах Нийгмийн даатгалын хэлтэст очиж баталгаажуулахыг анхаарна уу.";
        },
        error => {
          this.loading = false;
          console.log(error);
          this.router.navigate(["/error"]);
        }
      );
    }
  }
  confirm() {
    this.loading = true;
    var retrynum: number = 0;
    this.service.getRetryNum(this.email).subscribe(
      result => {
        retrynum = result;
        this.saveconfirm(retrynum);
      },
      error => {
        console.log(error);
        retrynum = 0;
        this.saveconfirm(retrynum);
      }
    );
  }
  private saveconfirm(retrynum: number) {
    this.success_message = undefined;

    if (retrynum >= 3) {
      this.loading = false;
      this.success_message = undefined;
      this.errormessage =
        "Та 3-аас олон удаа буруу оруулсан байна. Өөрт ойр байрлах Нийгмийн даатгалын хэлтэст очиж баталгаажилтаа хийлгэнэ үү.";
    } else {
      const data = {
        RegID: this.regid,
        oid: this.org.oid,
        AimagID: this.org.aimagID,
        OrgNdID: this.org.orgNdID,
        Date: this.date,
        Dun: this.dun
      };
      this.service.confirm(data).subscribe(
        result => {
          this.loading = false;
          if (result) {
            sessionStorage.clear();
            localStorage.clear();
            this.errormessage = undefined;
            this.success_message =
              "Амжилттай баталгаажлаа. Та нууц үгээ бүртгүүлсэн мэйл хаягаасаа авна уу. /Хэрэв ирээгүй байвал SPAM фолдертоо шалгана уу/";
          } else {
            this.errormessage =
              "Оруулсан дүн буруу байна. Таньд " +
              (3 - retrynum) +
              " удаа оруулах боломж байна.";
            this.service.setRetryNum(this.email).subscribe(
              result => {
                console.log(result);
              },
              error => {
                console.log(error);
              }
            );
          }
        },
        error => {
          this.loading = false;
          console.log(error);
        }
      );
    }
  }
}
