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

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('Token');
    const userID = this.route.snapshot.queryParamMap.get('UserID');
    if (token !== '') {
      const user = {
        token: token,
        userID: userID,

      }
      const currentDate = new Date();
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('startTime', currentDate.toString());
      this.router.navigate(['/']);
    } else {
      this.errormessage = 'Нэвтрэх эрхгүй байна!';
    }
  }
}
