import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QpayService } from '../../shared/qpay/qpay.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bankid = 0;
  step = 1;
  banks: any;
  constructor(private router: Router, private qpayService: QpayService) { }

  ngOnInit() {
    this.qpayService.BankList('2300').subscribe(banks => {
      this.banks = banks;
    });
  }
  SelectBank(bankid) {
    this.bankid = bankid;
    this.step = 2;
  }
  qpay() {
    this.router.navigate(['/main/view/payment/create']);
  }
}
