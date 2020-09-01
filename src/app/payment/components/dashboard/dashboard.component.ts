import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QpayService } from '../../shared/qpay/qpay.service';
import { ShareDataService } from 'src/app/shared/shared/share-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bank: any;
  step = 1;
  banks: any;
  payment: any;
  account: any;
  constructor(private router: Router, private qpayService: QpayService, private shareDataService: ShareDataService ) { }

  ngOnInit() {
    this.payment = this.shareDataService.GetPayment();
    console.log(this.payment);
    if (!this.payment) {
      this.router.navigate(['/main/view/sd/dashboard']);
    }

    this.qpayService.BankList(this.payment.BranchCode).subscribe(banks => {
      this.banks = banks;
    });
  }
  SelectBank(bank) {
    this.bank = bank;
    console.log(bank);
    this.getBankAccount(this.payment.BranchCode, this.bank.code);
    this.payment.BankCode = bank.code;
    this.shareDataService.SetPayment(this.payment);
    console.log(this.payment);
    this.step = 2;
  }
  qpay() {
    this.router.navigate(['/main/view/payment/showqpay']);
  }
  private getBankAccount(BranchCode, BankCode) {
    this.qpayService.BankAccount(BranchCode, BankCode).subscribe(account => {
      console.log(account);
      this.account = account[0];
    });
  }
}
