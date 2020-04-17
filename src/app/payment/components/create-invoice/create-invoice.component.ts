import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/ui/modal.service';
import { QpayService } from '../../shared/qpay/qpay.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css'],
})
export class CreateInvoiceComponent implements OnInit {
  error_message: string;
  agree: boolean;
  qrImage: string;
  constructor(private router: Router) {}

  ngOnInit() {}

  ShowQpay() {
    if (!this.agree) {
      this.error_message = 'Та үйлчилгээний нөхцлийг зөвшөөрөөгүй байна.';
    } else {
      this.router.navigate(['/main/view/payment/showqpay']);
    }
  }
}
