import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-refund-indicator',
  templateUrl: './refund-indicator.component.html',
  styleUrls: ['./refund-indicator.component.css']
})
export class RefundIndicatorComponent implements OnInit {
  @Input() type;
  constructor() { }

  ngOnInit() {
  }

}
