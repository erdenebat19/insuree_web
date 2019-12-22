import { Component, OnInit } from "@angular/core";
import { ModalService } from "src/app/shared/ui/modal.service";

@Component({
  selector: "app-create-invoice",
  templateUrl: "./create-invoice.component.html",
  styleUrls: ["./create-invoice.component.css"]
})
export class CreateInvoiceComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  ngOnInit() {}

  openModal(id: string) {
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
}
