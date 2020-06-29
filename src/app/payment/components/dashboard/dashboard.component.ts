import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bankid = 0;
  step = 1;
  constructor(private router: Router) { }

  ngOnInit() { }
  SelectBank(bankid) {
    this.bankid = bankid;
    this.step = 2;
  }
  qpay() {
    this.router.navigate(['/main/view/payment/create']);
  }
}
