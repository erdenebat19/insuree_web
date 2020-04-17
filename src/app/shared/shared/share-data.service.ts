import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShareDataService {
  private payment: any;
  constructor() {}
  SetPayment(payment) {
    this.payment = payment;
  }
  GetPayment(): any {
    return this.payment;
  }
}
