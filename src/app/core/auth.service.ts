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
    if (user == null || user == undefined) {
      return false;
    }
    if(user.token == null || user.token == undefined) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(user.token);
  }
}
