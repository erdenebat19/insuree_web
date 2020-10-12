import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../shared/account.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../shared/account.css', './login.component.css'],
})
export class LoginComponent implements OnInit {
  loading = false;
  password: string;
  userid: string;
  status: number = undefined;

  errormessage: string = undefined;
  redirect_uri: string = encodeURI('https://data.ndaatgal.mn:8081/userwebapi/api/auth/authorized');
  // tslint:disable-next-line: max-line-length
  scope = 'W3sic2VydmljZXMiOlsiV1MxMDAxMDFfZ2V0Q2l0aXplbklEQ2FyZEluZm8iXSwid3NkbCI6Imh0dHBzOi8veHlwLmdvdi5tbi9jaXRpemVuLTEuMi4wL3dzP1dTREwifV0=';
  // tslint:disable-next-line: max-line-length
  state = 'YjI3MjE2N2Q1MmM3MWMwZDZmOTJmYjAxNjgwNmQ3ZjQ5NTZkNDlhOTdmMGI2NjFlZGI1ODQwY2I2MTc2NzI0M2Y5NmI5MWZkODExMDQ1NTUyNWFiYTJmNzIxYmQ2MGVkYWMzZjZjNzlkZDA2MmM2YmZlMDc0MTMwOWY5ZWQ1YTM=';
  client_id = '39f6829bb99927ab2caf5772-1b8fecc9c85c5316880aa8ae68b35f57';
  dan_url =
    'https://sso.gov.mn/oauth2/authorize?response_type=code&client_id=' +
    this.client_id +
    '&scope=' +
    this.scope +
    '&redirect_uri=' +
    this.redirect_uri +
    '&state=' +
    this.state;
  closeResult: string;
  show_registration = false;
  show_validation = false;
  success_message: string;

  constructor(private router: Router, private _service: AccountService) {}

  ngOnInit(): void {
    localStorage.removeItem('browserRefresh');
  }
  Login(): void {
    this.loading = true;
    this._service.login(this.userid, this.password).subscribe(
      (result) => {
        this.loading = false;
        if (result) {
          const currentDate = new Date();
          localStorage.setItem('user', JSON.stringify(result));
          localStorage.setItem('startTime', currentDate.toString());
          this.router.navigate(['/']);
        } else {
          this.errormessage = 'Нэвтрэх эрхгүй байна';
        }
      },
      (error) => {
        this.loading = false;
        if (error.status === 0) {
          this.router.navigate(['/error']);
        } else {
          this.errormessage = error.message;
        }
      }
    );
  }
  check(): void {
    this.show_registration = false;
    this.show_validation = false;
    this.loading = true;
    this._service.getStatus(this.userid).subscribe(
      (result) => {
        this.loading = false;
        this.status = result;
        if (this.status === 0) {
          this.show_validation = true;
        }
        if (this.status === -1) {
          this.show_registration = true;
        }
      },
      (error) => {
        this.loading = false;
        console.log(error);
        this.status = undefined;
      }
    );
  }
  sendValidation() {
    this.loading = true;
    this._service.sendValidation(this.userid).subscribe(
      (result) => {
        this.loading = false;
        console.log(result);
        if (result) {
          this.errormessage = undefined;
          this.success_message = 'Баталгаажуулах хаягийг таны цахим хаягаар илгээлээ.';
        } else {
          this.success_message = undefined;
          this.errormessage = 'Баталгаажилт илгээх явцад алдаа гарлаа та имэйл хаягаа шалгаад дахин үзнэ үү';
        }
      },
      (error) => {
        this.loading = false;
        console.log(error);
      }
    );
  }
}
