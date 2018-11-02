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
      console.log(user.userID);
      this._service.changepassword(user.userID, this.OldPass, this.NewPass).subscribe(result => {
        console.log(result);
        this.loading = false;
        if (result) {
          if (result == 1) {
            this.errormessage = undefined;
            this.success_message = "Амжилттай солигдлоо!";
          }
          if (result == 2) {
            this.success_message = undefined;
            this.errormessage = "Алдаатай өгөгдөл дахин солино уу!";
          }
          else if (result != 1) {
            this.success_message = undefined;
            this.router.navigate(['/error']);
          }
        }
      }, error => {
        this.loading = false;
        if (error.status == 0) {
          this.router.navigate(['/error']);
        }
        else {
          console.log(error);
          this.errormessage = error.message;
        }
      });
    }
  }
}
