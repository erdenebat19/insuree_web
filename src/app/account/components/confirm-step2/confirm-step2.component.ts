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
      console.log(sessionStorage.getItem("profile"));
      this.service.getLastDate(this.regid, this.org.oid).subscribe(
        result => {
          this.loading = false;
          this.date = new Date(result);
          this.date.setDate(this.date.getDate() + 3);
          if (this.org.oid == 0) {
            this.info_message =
              "Таны нэвтрэх эрхийг цахим орчинд баталгаажуулах боломжгүй тул . өөрт ойр байрлах Нийгмийн даатгалын хэлтэст хандаж нэвтрэх эрхээ баталгаажуулах боломжтой";
          } else if (this.org.oid == 1) {
            this.info_message =
              "Та " +
              this.date.getFullYear() +
              " оны " +
              (this.date.getMonth() + 1) +
              " сард сайн дурын даатгалд төлсөн мөнгөн дүнгээ оруулна уу.";
            this.info_message =
              this.info_message +
              " Хэрэв та 3 удаа мөнгөн дүнгээ буруу оруулах юм бол таны нэвтрэх эрхийг цахим орчинд баталгаажуулах боломжгүй болно. Ингэсэн тохиолдолд та өөрт ойр байрлах Нийгмийн даатгалын хэлтэст хандаж нэвтрэх эрхээ баталгаажуулах боломжтой.";
            this.pholder = "Төлсөн шимтгэл";
          } else {
            this.info_message =
              "Та " +
              this.org.orgName +
              " байгууллагад " +
              this.date.getFullYear() +
              " оны " +
              (this.date.getMonth() + 1) +
              "-р сард авсан нийгмийн даатгалын шимтгэл бодсон цалингийн дүнгээ оруулна уу";
            this.pholder = "Цалин";
            this.info_message =
              this.info_message +
              " Хэрэв та 3 удаа мөнгөн дүнгээ буруу оруулах юм бол таны нэвтрэх эрхийг цахим орчинд баталгаажуулах боломжгүй болно. Ингэсэн тохиолдолд та өөрт ойр байрлах Нийгмийн даатгалын хэлтэст хандаж нэвтрэх эрхээ баталгаажуулах боломжтой.";
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
    this.saveconfirm();
  }
  private saveconfirm() {
    this.loading = true;
    this.success_message = undefined;

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
        console.log(result);
        this.loading = false;
        if (result.isDone) {
          sessionStorage.clear();
          localStorage.clear();
          this.errormessage = undefined;
          this.success_message =
            "Таны бүртгүүлсэн цахим шуудан руу системд нэвтрэх нууц үгийг илгээлээ. /Хэрэв ирээгүй бол SPAM дотроо шалгана уу/";
        } else {
          this.success_message = undefined;
          this.errormessage = result.resultMessage;
        }
      },
      error => {
        this.loading = false;
        console.log(error);
      }
    );
  }
}
