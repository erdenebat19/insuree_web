import { Component, OnInit } from "@angular/core";
import { ReferenceService } from "../../shared/reference.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-contract-register",
  templateUrl: "./contract-register.component.html",
  styleUrls: ["./contract-register.component.css"]
})
export class ContractRegisterComponent implements OnInit {
  AMClasses: any[];
  Banks: any[];
  Periods: any[];
  contract: any;
  MinSalary: any;
  postback: boolean = false;
  changedIncome: boolean = false;
  loading: boolean = true;
  constructor(private refService: ReferenceService, private router: Router) {}

  ngOnInit() {
    this.contract = {
      AMClass: 0,
      Length: 12,
      Period: 1,
      Bank: 0
    };
    this.loading = true;
    this.refService.AMClassList().subscribe(result => {
      this.AMClasses = result;
      this.loading = false;
    });
    this.loading = true;
    this.refService.BankList().subscribe(result => {
      this.Banks = result;
      this.loading = false;
    });
    this.loading = true;
    this.refService.GetMinSalary().subscribe(result => {
      this.MinSalary = result.MinSalary;
      this.loading = false;
    });
    this.loading = true;
    this.refService.ContractPeriods().subscribe(result => {
      this.Periods = result;
      this.contract.Period = this.Periods[0];
      this.loading = false;
    });
  }

  register() {
    this.postback = true;
    if (this.validate()) {
      localStorage.setItem("contract-register", JSON.stringify(this.contract));
      this.router.navigate(["/main/view/sd/confirm"]);
    }
  }
  onChangeIncome(newval) {
    if (this.contract.Income < this.MinSalary) {
      this.changedIncome = true;
    } else {
      this.changedIncome = false;
    }
  }
  validate(): boolean {
    if (this.contract.AMClass == 0) {
      return false;
    }
    if (this.contract.Bank == 0) {
      return false;
    }
    if (this.contract.Income < this.MinSalary) {
      return false;
    }
    return true;
  }
}
