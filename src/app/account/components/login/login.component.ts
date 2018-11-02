import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../shared/account.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading: boolean = false;
  password: string;
  userid: string;
  errormessage: string = undefined;
  constructor(private router: Router, private _service: AccountService) { }
  ngOnInit(): void {
    localStorage.removeItem('browserRefresh');
  }
  Login(): void {
    this.loading = true;
    this._service.login(this.userid, this.password).subscribe(result => {
      console.log(result);
      this.loading = false;
      if (result) {
        localStorage.setItem('user', JSON.stringify(result));
        this.router.navigate(['/']);
      }
      else {
        this.errormessage = "Нэвтрэх эрхгүй байна";
      }
    }, error => {
      this.loading = false;
      if (error.status == 0) {
        this.router.navigate(['/error']);
      }
      else {
        this.errormessage = error.message;
      }
    });
  }
}