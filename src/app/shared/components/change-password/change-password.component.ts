import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/shared/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  errormessage: string;
  loading: boolean;
  success_message: string;
  OldPass: any;
  NewPass: string;

  constructor(private router: Router, private _service: AccountService) { }

  ngOnInit() {
  }

  changepassword() {
    if (this.OldPass == undefined || this.OldPass == '') {
      this.errormessage = 'Имэйл оруулаагүй байна!';
      return;
    }
    if (this.NewPass == undefined || this.NewPass == '') {
      this.errormessage = 'Имэйл оруулаагүй байна!';
      return;
    }
    else {
      this.loading = true;
      let user = JSON.parse(localStorage.getItem('user'));
      this._service.changepassword(user.userID, this.OldPass, this.NewPass).subscribe(result => {        
        this.loading = false;
        this.errormessage = undefined;
        this.success_message = "Амжилттай солигдлоо!";

      }, error => {
        this.loading = false;
        if (error.status == 0 || error.status == 500) {
          this.router.navigate(['/error']);
        }
        else if (error.status == 401) {
          this.success_message = undefined;
          this.errormessage = "Нууц үг буруу байна!";
        }
        else {
          this.success_message = undefined;
          this.errormessage = error.message;
        }
      });
    }
  }
}
