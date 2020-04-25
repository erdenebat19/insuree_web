import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/notification/shared/message.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css', './main-page-responsive.css'],
})
export class MainPageComponent implements OnInit {
  unreadNum: number;
  title = 'Даатгуулагчийн вэб';

  constructor(private router: Router, public messageService: MessageService) {}

  ngOnInit() {
    this.messageService.UnreadNum().subscribe((result) => {
      this.unreadNum = result;
      this.messageService.SetUnreadNum(this.unreadNum);
    });
  }
  Logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/account/login']);
  }
}
