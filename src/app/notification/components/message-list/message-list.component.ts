import { Component, OnInit } from "@angular/core";
import { MessageService } from "../../shared/message.service";

@Component({
  selector: "app-message-list",
  templateUrl: "./message-list.component.html",
  styleUrls: ["./message-list.component.css"]
})
export class MessageListComponent implements OnInit {
  p: number = 1;
  messages: any[];

  constructor(private service: MessageService) {}

  ngOnInit() {
    this.service.List().subscribe(result => {
      this.messages = result;
    });
  }
}
