import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-alert-inline",
  templateUrl: "./alert-inline.component.html",
  styleUrls: ["./alert-inline.component.css"]
})
export class AlertInlineComponent implements OnInit {
  @Input() message: string;
  constructor() {}

  ngOnInit() {}
}
