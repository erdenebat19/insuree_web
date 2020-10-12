import { Component, OnInit } from '@angular/core';
import { ContractService } from '../../shared/contract.service';
import { ErrorService } from 'src/app/shared/shared/error.service';
import { Router } from '@angular/router';
import { Options } from 'ng5-slider';
import { ShareDataService } from 'src/app/shared/shared/share-data.service';

@Component({
  selector: 'app-contract-register-payment',
  templateUrl: './contract-register-payment.component.html',
  styleUrls: ['./contract-register-payment.component.css'],
})
export class ContractRegisterPaymentComponent implements OnInit {
  payment: any[];
  amount: number;
  PayMonth = 1;
  contract: any;
  error_message: any;
  minPayMonth: number;
  monthNum = 12;
  options: Options;
  loading_payment = false;

  constructor(
    private contractService: ContractService,
    private errorService: ErrorService,
    private router: Router,
    private shareDataService: ShareDataService
  ) {}

  ngOnInit() {
    this.options = {
      ceil: 12,
      floor: 1,
      showSelectionBar: true,
      showTicks: true,
    };
    this.loading_payment = true;
    this.contractService.Get().subscribe((result) => {
      this.contract = result;
      if (!this.contract) {
        this.error_message = 'Гэрээ бүртгээгүй байна';
      }
      this.payment = [];
      this.contractService.GetPreSchedule().subscribe(
        (resultSchedule) => {
          this.loading_payment = false;
          resultSchedule.forEach((item) => {
            this.payment.push({
              PayDate: new Date(item.calYear, item.calMonth, 1),
              Amount: item.dun,
              ischecked: false,
            });
          });
          if (this.payment.length > 0) {
            this.payment[0].ischecked = true;
            this.amount = this.payment[0].Amount;
          }
        },
        (error) => {
          this.loading_payment = false;
          this.error_message = this.errorService.getInlineError(error);
        }
      );
    });
  }
  calc() {
    this.amount = 0;
    this.payment.forEach((i) => {
      i.ischecked = false;
    });
    for (let i = 0; i < this.PayMonth; i++) {
      this.payment[i].ischecked = true;
      this.amount = this.amount + this.payment[i].Amount;
    }
  }
  pay() {
    // sessionStorage.setItem('Amount', this.amount.toString());
    const checkedList = this.payment.filter((x) => x.ischecked);
    const bdate = checkedList[0].PayDate;
    const edate = checkedList[checkedList.length - 1].PayDate;
    this.shareDataService.SetPayment({
      CountryId: this.contract.countryId,
      BranchCode: this.contract.dom,
      RegID: this.contract.regID,
      BenID: this.contract.benID,
      ContractId: Number.parseInt(this.contract.id, 10),
      Class: 0,
      Amount: this.amount,
    });
    this.router.navigate(['main/view/payment']);
  }
}
