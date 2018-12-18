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
  redirect_uri: string = encodeURI("https://data.ndaatgal.mn:8081/userwebapi/api/auth/authorized");
  scope: string = "W3sic2VydmljZXMiOlsiV1MxMDAxMDFfZ2V0Q2l0aXplbklEQ2FyZEluZm8iXSwid3NkbCI6Imh0dHBzOi8veHlwLmdvdi5tbi9jaXRpemVuLTEuMi4wL3dzP1dTREwifV0=";
  state: string = "YjI3MjE2N2Q1MmM3MWMwZDZmOTJmYjAxNjgwNmQ3ZjQ5NTZkNDlhOTdmMGI2NjFlZGI1ODQwY2I2MTc2NzI0M2Y5NmI5MWZkODExMDQ1NTUyNWFiYTJmNzIxYmQ2MGVkYWMzZjZjNzlkZDA2MmM2YmZlMDc0MTMwOWY5ZWQ1YTM=";
  client_id: string = "39f6829bb99927ab2caf5772-1b8fecc9c85c5316880aa8ae68b35f57";
  dan_url = "https://sso.gov.mn/oauth2/authorize?response_type=code&client_id=" + this.client_id + "&scope=" + this.scope + "&redirect_uri=" + this.redirect_uri + "&state=" + this.state;

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