import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { User } from "./user";

@Injectable({
  providedIn: "root"
})
export class AccountService {
  // apiurl = "https://data.ndaatgal.mn:8081/userwebapi/api/";
  apiurl = "http://localhost:10012/api/";
  appurl = "https://data.ndaatgal.mn/NDM/";
  ndmurl = "http://data.ndaatgal.mn:8080/ndmapi/api/";
  //ndmurl = "http://app.ndaatgal.mn:830/ndmapi/api/";

  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    const data = {
      UserName: userName,
      Password: password
    };
    return this.http.post<any>(this.apiurl + "auth/login", data, httpOptions);
  }
  register(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    // return null;
    return this.http.post<any>(
      this.appurl +
        "Register?user.last_name=" +
        user.LastName +
        "&user.first_name=" +
        user.FirstName +
        "&user.register=" +
        user.RegID +
        "&user.login_id=" +
        user.Email +
        "&user.phone=" +
        user.Phone,
      httpOptions
    );
  }
  editregister(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    const data = {
      login_id: user.Email,
      register: user.RegID,
      sur_name: user.SurName,
      last_name: user.LastName,
      first_name: user.FirstName,
      phone: user.Phone,
      user_id: user.id
    };
    return this.http.post<any>(this.ndmurl + "saveUser", data, httpOptions);
  }
  resetpassword(email: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post<any>(
      this.appurl + "ForgetPass?forgetPass=" + email,
      httpOptions
    );
  }
  changepassword(
    RegID: string,
    OldPass: string,
    NewPass: string
  ): Observable<any> {
    let user = JSON.parse(localStorage.getItem("user"));
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      })
    };
    const data = {
      OldPassword: OldPass,
      NewPassword: NewPass
    };
    return this.http.post<any>(
      this.apiurl + "auth/ChangePassword",
      data,
      httpOptions
    );
  }
  getProfile(id: string, val: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.get(
      this.ndmurl + "checkVal?userid=" + id + "&val=" + val,
      httpOptions
    );
  }
  getRandomOrgs(regid: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.get(
      this.apiurl + "auth/GetRandomOrgs?RegID=" + regid,
      httpOptions
    );
  }
  getLastDate(regid: string, oid: string): Observable<Date> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.get<Date>(
      this.apiurl + "auth/GetLastDate?RegID=" + regid + "&oid=" + oid,
      httpOptions
    );
  }
  confirm(param: any): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    const data = {
      RegID: param.RegID,
      oid: param.oid,
      AimagID: param.AimagID,
      OrgNdID: param.OrgNdID,
      Date: param.Date,
      Dun: param.Dun
    };
    return this.http.post<boolean>(
      this.apiurl + "auth/confirm",
      data,
      httpOptions
    );
  }
}
