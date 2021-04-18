import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../shared/account.service';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.css']
})
export class AuthorizedComponent implements OnInit {
  errormessage: string;
  userString: string;
  startTimeString: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService
    ) { }

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('Token');
    const userID = this.route.snapshot.queryParamMap.get('UserID');
    if (token !== '') {
      const user = {
        token: token,
        userID: userID
      };
      const currentDate = new Date();
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('startTime', currentDate.toString());
      this.userString = JSON.stringify(user);
      this.startTimeString = currentDate.toString();
      const ua = navigator.userAgent;
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
        console.log(ua);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.errormessage = 'Нэвтрэх эрхгүй байна!';
    }
  }
}
