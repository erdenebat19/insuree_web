import { Component, OnInit } from "@angular/core";
import { ModalService } from "src/app/shared/ui/modal.service";
import { QpayService } from "../../shared/qpay/qpay.service";

@Component({
  selector: "app-create-invoice",
  templateUrl: "./create-invoice.component.html",
  styleUrls: ["./create-invoice.component.css"]
})
export class CreateInvoiceComponent implements OnInit {
  loading_message = false;
  alert_error_message: string;
  agree: boolean;
  loading: boolean;
  qrImage: string;
  constructor(
    private modalService: ModalService,
    private qpService: QpayService
  ) {}

  ngOnInit() {}

  openModal(id: string) {
    if (!this.agree) {
      this.alert_error_message = "Та үйлчилгээний нөхцлийг зөвшөөрөөгүй байна.";
    } else {
      console.log(sessionStorage.getItem("Amount"));
      this.alert_error_message = undefined;
      this.loading = true;
      this.qpService
        .Create({
          Amount: sessionStorage.getItem("Amount"),
          Class: {
            id: 1,
            name: "Сайн дурын даатгал"
          },
          Description: "Даатгалын гэрээний төлбөр"
        })
        .subscribe(result => {
          console.log(result);
          this.qrImage = "data:image/png;base64," + result.qPay_QRimage;
        })
        .add(() => {
          this.loading = false;
        });
    }
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
}
