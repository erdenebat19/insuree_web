import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-report',
  templateUrl: './error-report.component.html',
  styleUrls: ['./error-report.component.css']
})

export class ErrorReportComponent implements OnInit {
  @Input() redirectUrl: string;
  browserRefresh: boolean = false;
  constructor(private router: Router) { }
  ngOnInit() {
    if (localStorage.getItem('browserRefresh') != null) {
      console.log(localStorage.getItem('browserRefresh'));
      this.router.navigate(['/login']);
    }
    localStorage.setItem('browserRefresh', '1');
  }
}
