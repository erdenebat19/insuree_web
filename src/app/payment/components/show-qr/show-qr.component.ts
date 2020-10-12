import { Component, OnInit } from '@angular/core';
import { QpayService } from '../../shared/qpay/qpay.service';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/shared/shared/share-data.service';
import { ErrorService } from 'src/app/shared/shared/error.service';

@Component({
  selector: 'app-show-qr',
  templateUrl: './show-qr.component.html',
  styleUrls: ['./show-qr.component.css'],
})
export class ShowQRComponent implements OnInit {
  error_message: any;
  loading: boolean;
  qrImage: string;
  constructor(
    private qpService: QpayService,
    private router: Router,
    private shareDataService: ShareDataService,
    private errorService: ErrorService) {}

  ngOnInit() {
    const payment = this.shareDataService.GetPayment();
    this.error_message = undefined;
    this.loading = true;

    if (this.qrImage == null) {
      this.qpService
        .Create(payment)
        .subscribe((result) => {
          this.qrImage = 'data:image/png;base64,' + result.json_data.qPay_QRimage;
          sessionStorage.setItem('qpayImage', this.qrImage);
          sessionStorage.setItem('paymentId', result.json_data.invoice_id);
          this.shareDataService.SetInvoice(result.invoiceNumber);
          this.qpService.startConnection();
          this.qpService.addCheckPaymentListener();
        }, error => {
          this.error_message = this.errorService.getInlineError(error);
          if (!this.error_message) {
            this.error_message = error.message;
          }
        })
        .add(() => {
          this.loading = false;
        });
    } else {
      this.loading = false;
    }
  }
}
