import { Component, OnInit } from '@angular/core';
import { ReferenceService } from '../../shared/reference.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ContractService } from '../../shared/contract.service';
import { ErrorService } from 'src/app/shared/shared/error.service';

@Component({
  selector: 'app-contract-register',
  templateUrl: './contract-register.component.html',
  styleUrls: ['./contract-register.component.css'],
})
export class ContractRegisterComponent implements OnInit {
  AMClasses: any[];
  Banks: any[];
  Periods: any[];
  contract: any;
  MinSalary: any;
  postback = false;
  changedIncome = false;
  loading = true;
  errormessage: string;
  extend = false;
  Countries: any;
  constructor(
    private refService: ReferenceService,
    private router: Router,
    private route: ActivatedRoute,
    private contractService: ContractService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.contract = {
      Class: 0,
      Length: 12,
      ContractPeriod: 0,
      Account: 0,
    };
    this.LoadData().then(() => {
      this.route.url.subscribe((url) => {
        if (url[0].path === 'extend') {
          this.extend = true;
          this.contractService.Get().subscribe(
            (result) => {
              console.log(result);
              this.contract = {
                Id: result.id,
                Class: { Id: result.class.id, Name: result.class.name },
                Income: result.income,
                ContractPeriod: { Id: result.period, Name: result.periodName },
                Length: result.length,
                Account: { Code: result.dans.code, BankName: result.dans.bankName, Account: result.dans.account },
              };
              if (!this.contract) {
                this.errormessage = 'Гэрээ бүртгэлгүй байна';
              }
            },
            (error) => {
              this.errormessage = this.errorService.getInlineError(error);
            }
          );
        }
      });
    });
  }
  async LoadData() {
    this.loading = true;
    this.refService.CountryList().subscribe((result) => {
      this.Countries = result;
      this.loading = false;
      this.contract.CountryId = '001';
    });
    this.loading = true;
    this.refService.AMClassList().subscribe((result) => {
      this.AMClasses = result;
      this.loading = false;
    });
    this.loading = true;
    this.refService.BankList().subscribe((result) => {
      this.Banks = result;
      this.loading = false;
    });
    this.loading = true;
    this.refService.GetMinSalary().subscribe((result) => {
      this.MinSalary = result;
      this.loading = false;
    });
    this.loading = true;
    this.refService.ContractPeriods().subscribe((result) => {
      this.Periods = result;
      this.loading = false;
    });
  }
  register() {
    this.contract.Class = { Id: this.contract.Class.id, Name: this.contract.Class.name };
    this.contract.ContractPeriod = { Id: this.contract.ContractPeriod.id, Name: this.contract.ContractPeriod.name };
    this.contract.Account = {
      Code: this.contract.Account.code,
      BankName: this.contract.Account.bankName,
      Account: this.contract.Account.account,
    };
    this.contract.Income = Number.parseFloat(this.contract.Income);
    console.log(this.contract);
    this.postback = true;
    if (this.validate()) {
      if (this.extend) {
        localStorage.setItem('contract-extend', JSON.stringify(this.contract));
      } else {
        localStorage.setItem('contract-register', JSON.stringify(this.contract));
      }
      this.router.navigate(['/main/view/sd/confirm']);
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
    if (!this.contract.Class || this.contract.Class === 0) {
      return false;
    }
    if (!this.contract.Account || this.contract.Account === 0) {
      return false;
    }
    if (!this.contract.Income || this.contract.Income < this.MinSalary) {
      return false;
    }
    return true;
  }
  byId(item1: any, item2: any) {
    return item1.id === item2.id;
  }
  byCode(item1: any, item2: any) {
    return item1.code === item2.code;
  }
}
