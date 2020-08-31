import { Component, OnInit } from '@angular/core';
import { QpayService } from '../../shared/qpay/qpay.service';
import { of, throwError } from 'rxjs';
import { retryWhen, delay, mergeMap } from 'rxjs/operators';
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
    console.log(this.shareDataService.GetPayment());
    const payment = this.shareDataService.GetPayment();
    this.error_message = undefined;
    this.loading = true;

    if (this.qrImage == null) {
      this.qpService
        .Create(payment)
        .subscribe((result) => {
          console.log(result);
          this.qrImage = 'data:image/png;base64,' + result.json_data.qPay_QRimage;
          sessionStorage.setItem('qpayImage', this.qrImage);
          sessionStorage.setItem('paymentId', result.json_data.invoice_id);
          this.qpService.startConnection();
          this.qpService.addCheckPaymentListener();
          // this.check();
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
      // this.check();
    }
  }
  private check() {
    this.loading = true;
    const paymentId = sessionStorage.getItem('paymentId');
    let retry = 3;
    const sub = this.qpService
      .Check(paymentId)
      .pipe(
        retryWhen((errs) =>
          errs.pipe(
            delay(1000),
            mergeMap((err, i) => {
              console.log(i);
              if (err.status !== 600) {
                return throwError(err);
              }
              // FIXME Алдааны мэссэжийг засах
              return retry-- > 0 ? of(err) : throwError('Retry expired');
            })
          )
        )
      )
      .subscribe(
        (result) => {
          this.loading = false;
          console.log(result);
          sub.unsubscribe();
          sessionStorage.removeItem('qpayImage');
          sessionStorage.removeItem('paymentId');
          sessionStorage.removeItem('Amount');
          this.router.navigate(['main/view/sd/dashboard']);
          return;
        },
        (err) => {
          this.loading = false;
          this.error_message = err.error ? err.error : err;
          console.log(err);
          sub.unsubscribe();
        }
      );
  }
}
