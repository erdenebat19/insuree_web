import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  constructor() { }
  public isAuthenticated(): boolean {
    var user = JSON.parse(localStorage.getItem('user'));
    var startDate = new Date(localStorage.getItem('startTime'));
    if (user == null || user == undefined) {
      return false;
    }
    if (user.token == null || user.token == undefined) {
      return false;
    }
    var currentDate = new Date();
    var minutes = Math.floor((currentDate.getTime() - startDate.getTime()) / 60000);
    if (minutes > 60)
    {
      localStorage.clear();
      return false;
    }
    else
      return true;
  }
}
