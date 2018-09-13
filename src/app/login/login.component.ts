import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent {
  loading: boolean = false;
  password: string;
  userid: string;
  aimag: string;
  errormessage: string = undefined;
  aimags: any[];
  constructor(private router: Router, private _service: LoginService) { }
  ngOnInit(): void {    
  }
  Login(): void {
    if(this.aimag == undefined || this.aimag == "")
    {
     this.errormessage = "Хэлтсээ сонгоогүй байна.";
    }
    this.loading = true;
    this._service.login(this.userid, this.password).subscribe(result => {
      this.loading = false;
      if (result) {
        localStorage.setItem('user', result);
        this.router.navigate(['/salary']);
      }
      else {
        this.errormessage = "Нэвтрэх эрхгүй байна";
      }
    }, error => {
      this.loading = false;
      this.errormessage = error;
    });
  }
}