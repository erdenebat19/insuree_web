import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-confirm-contract-register",
  templateUrl: "./confirm-contract-register.component.html",
  styleUrls: ["./confirm-contract-register.component.css"]
})
export class ConfirmContractRegisterComponent implements OnInit {
  contract: string;
  confirm_message: string;

  constructor() {}

  ngOnInit() {
    this.contract = JSON.parse(localStorage.getItem("contract-register"));
  }
}
