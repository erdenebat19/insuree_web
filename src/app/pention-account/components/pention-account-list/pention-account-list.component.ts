import { Component, OnInit } from '@angular/core';
import { PentionAccountService } from '../../shared/pention-account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pention-account-list',
  templateUrl: './pention-account-list.component.html',
  styleUrls: ['./pention-account-list.component.css']
})
export class PentionAccountListComponent implements OnInit {
  constructor(private route: Router, private service: PentionAccountService) { }

  ngOnInit() {
  }

}
