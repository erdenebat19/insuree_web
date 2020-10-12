import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/shared/shared/error.service';
import { ShareDataService } from 'src/app/shared/shared/share-data.service';
import { QpayService } from '../../shared/qpay/qpay.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  errormessage: any;
  successmessage: string;

  constructor(
    private qpService: QpayService,
    private sharedData: ShareDataService,
    private router: Router,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.check();
  }
  check() {
    console.log(this.sharedData.GetInvoice());
    this.qpService.Check(this.sharedData.GetInvoice()).subscribe(result => {
      console.log(result);
      if (result) {
        this.successmessage = 'Төлбөр төлөгдсөн байна';
      } else {
        this.errormessage = 'Төлбөр төлөгдөөгүй байна';
      }
    }, error => {
      this.errormessage = this.errorService.getInlineError(error);
      if (this.errormessage) {
        this.errormessage = error.message;
      }
    });
  }
}
