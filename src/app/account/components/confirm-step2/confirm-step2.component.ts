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
  regid: any;
  dun: number;
  success_message: string;

  constructor(private router: Router, private service: AccountService) {}

  ngOnInit() {
    this.loading = true;
    if (
      sessionStorage.getItem("selectedOrg") == undefined ||
      sessionStorage.getItem("selectedOrg") == null
    ) {
      this.router.navigate(["/account/confirm1"]);
    } else {
      this.regid = JSON.parse(sessionStorage.getItem("profile")).register;
      this.org = JSON.parse(sessionStorage.getItem("selectedOrg"));
      this.service.getLastDate(this.regid, this.org.oid).subscribe(
        result => {
          this.loading = false;
          this.date = new Date(result);
          this.date.setHours(48);
          if (this.org.oid == 1) {
            this.info_message =
              "Та " +
              this.date.getFullYear() +
              " оны " +
              this.date.getMonth() +
              " сард сайн дурын даатгалд төлсөн мөнгөн дүнгээ оруулна уу.";
            this.pholder = "Төлсөн шимтгэл";
          } else {
            this.info_message =
              "Та " +
              this.org.orgName +
              " байгууллагад " +
              this.date.getFullYear() +
              " оны " +
              this.date.getMonth() +
              " сард авсан цалингийн дүнгээ оруулна уу.";
            this.pholder = "Цалин";
          }
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
    if (localStorage.getItem("retrynum") == undefined) {
      localStorage.setItem("retrynum", "0");
    }
    var retrynum = Number.parseInt(localStorage.getItem("retrynum"));
    this.success_message = undefined;
    this.errormessage = "Буруу оруулсан байна. " + retrynum;
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
          console.log(result);
          if (result) {
            sessionStorage.clear();
            localStorage.clear();
            this.errormessage = undefined;
            this.success_message =
              "Амжилттай баталгаажлаа. Та нууц үгээ бүртгүүлсэн мэйл хаягаасаа авна уу. /Хэрэв ирээгүй байвал SPAM фолдертоо шалгана уу/";
          } else {
            retrynum++;
            localStorage.setItem("retrynum", retrynum.toString());
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
