import { Component, OnInit } from "@angular/core";
import { ReferenceService } from "../../shared/reference.service";

@Component({
  selector: "app-contract-register",
  templateUrl: "./contract-register.component.html",
  styleUrls: ["./contract-register.component.css"]
})
export class ContractRegisterComponent implements OnInit {
  AMClasses: any[];
  Banks: any[];
  constructor(private refService: ReferenceService) {}

  ngOnInit() {
    this.refService.AMClassList().subscribe(result => {
      this.AMClasses = result;
    });
    this.refService.BankList().subscribe(result => {
      this.Banks = result;
    });
  }
}
