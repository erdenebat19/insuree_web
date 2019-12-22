import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ReferenceService {
  //apiurl = "https://data.ndaatgal.mn:8081/userwebapi/api/References/";
  apiurl = "http://localhost:10012/api/References/";
  //apiurl = "http://localhost:3000/";
  constructor(private http: HttpClient) {}

  AMClassList(): Observable<any> {
    let user = JSON.parse(localStorage.getItem("user"));
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      })
    };
    return this.http.get(this.apiurl + "ClassList", httpOptions);
  }
  BankList(): Observable<any> {
    let user = JSON.parse(localStorage.getItem("user"));
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      })
    };
    return this.http.get(this.apiurl + "Banks", httpOptions);
  }
  AimagList(): Observable<any> {
    let user = JSON.parse(localStorage.getItem("user"));
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      })
    };
    return this.http.get(this.apiurl + "Aimags", httpOptions);
  }
  GetMinSalary(): Observable<any> {
    let user = JSON.parse(localStorage.getItem("user"));
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      })
    };
    return this.http.get(
      this.apiurl + "MinSalary?date=2019-01-01",
      httpOptions
    );
  }
  ContractPeriods(): Observable<any> {
    let user = JSON.parse(localStorage.getItem("user"));
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      })
    };
    return this.http.get(this.apiurl + "ContractPeriods", httpOptions);
  }
}
