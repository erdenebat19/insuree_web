import { Component, OnInit } from '@angular/core';
import { RecaptchaComponent } from 'ng-recaptcha';
import { Router } from '@angular/router';
import { AccountService } from '../../shared/account.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  grecaptcha: any;
  errormessage: string;
  email: string;
  reCaptcha: any;
  captchaRef: RecaptchaComponent;
  isvalid: boolean = false;
  loading: boolean;
  success_message: string;

  constructor(private router: Router, private _service: AccountService) { }

  ngOnInit() {
  }

  resetpassword(RecaptchaResponse: string) {
    if(this.email == undefined || this.email == '') {
      this.errormessage = 'Имэйл оруулаагүй байна!';
    }
    else{
      this.loading = true;
      this._service.resetpassword(this.email).subscribe(result => {
        console.log(result);
        this.loading = false;
        if (result) {
          if (result == 1) {
            this.errormessage = undefined;
            this.success_message = "Амжилттай илгээлээ та цахим шуудангаа шалгана уу!";
          }
          if (result == 0) {
            this.success_message = undefined;
            this.errormessage = "Бүртгэлгүй цахим шуудан эсвэл таны бүртгэл баталгаажаагүй байна!";
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
          this.errormessage = error.message;
        }
      });
    }    
    console.log(RecaptchaResponse);
  }
}
