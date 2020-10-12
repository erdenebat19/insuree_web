import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShareDataService {
  private payment: any;
  private invoice: any;
  constructor() {}
  SetPayment(payment) {
    this.payment = payment;
  }
  GetPayment(): any {
    return this.payment;
  }
  SetInvoice(invoice) {
    this.invoice = invoice;
  }
  GetInvoice(): any {
    return this.invoice;
  }
}
