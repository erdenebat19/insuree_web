import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  apiurl = "https://data.ndaatgal.mn:8081/userwebapi/api/";
  appurl = "http://data.ndaatgal.mn/NDM/";
  constructor(private http: HttpClient) { }

  login(userName: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    const data = {
      'UserName': userName,
      'Password': password
    };
    return this.http.post<any>(this.apiurl + "auth/login", data, httpOptions);
  }
  register(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    // return null;
    return this.http.post<any>(this.appurl +
      "Register?user.last_name=" + user.LastName +
      '&user.first_name=' + user.FirstName +
      '&user.register=' + user.RegID +
      '&user.login_id=' + user.Email +
      '&user.phone=' + user.Phone
      , httpOptions);
  }
  resetpassword(email: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<any>(this.appurl + "ForgetPass?forgetPass=" + email, httpOptions);
  }
  changepassword(RegID: string, OldPass: string, NewPass: string): Observable<any> {
    let user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` }),
    };
    const data = {
      'OldPassword': OldPass,
      'NewPassword': NewPass
    };
    return this.http.post<any>(this.apiurl + "auth/ChangePassword", data, httpOptions);
  }
}
