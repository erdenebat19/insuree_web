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
  bankid = 0;
  step = 1;
  banks: any;
  payment: any;
  constructor(private router: Router, private qpayService: QpayService, private shareDataService: ShareDataService ) { }

  ngOnInit() {
    // TODO fix 2300 to dom from param
    this.payment = this.shareDataService.GetPayment();
    console.log(this.payment);
    if (!this.payment) {
      this.router.navigate(['/main/view/payment/dashboard']);
    }

    this.qpayService.BankList(this.payment.BranchCode).subscribe(banks => {
      this.banks = banks;
    });
  }
  SelectBank(bankid) {
    this.bankid = bankid;
    this.payment.BankCode = bankid;
    this.shareDataService.SetPayment(this.payment);
    console.log(this.payment);
    this.step = 2;
  }
  qpay() {
    this.router.navigate(['/main/view/payment/create']);
  }
}
