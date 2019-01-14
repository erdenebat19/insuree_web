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
    var token = this.route.snapshot.queryParamMap.get('Token');
    var userID = this.route.snapshot.queryParamMap.get('UserID');
    if (token != "") {
      let user = {
        token: token,
        userID: userID,

      }
      var currentDate = new Date();
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('startTime', currentDate.toString());
      this.router.navigate(['/']);
    }
    else {
      this.errormessage = "Нэвтрэх эрхгүй байна!";
    }
  }
}
