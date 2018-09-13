import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  grecaptcha: any;
  errormessage: string;
  email: string;
  gReCaptchaResponse: string;
  isvalid: boolean = false;

  constructor() { }

  ngOnInit() {
  }
  resetpassword() {
    console.log(this.gReCaptchaResponse);
  }
  getCaptchaResponse(response: any) {    
    this.gReCaptchaResponse = response;
    if(this.gReCaptchaResponse != undefined && this.gReCaptchaResponse!="")
    {
      this.isvalid = true;
    }
    console.log('getCaptchaResponse');
    console.log(response);
  }
}
