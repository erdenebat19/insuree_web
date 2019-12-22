import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ContractService {
  //apiurl = "http://localhost:3000/";
  apiurl = "http://localhost:10012/api/";

  constructor(private http: HttpClient) {}

  Get(): Observable<any> {
    let user = JSON.parse(localStorage.getItem("user"));
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      })
    };
    return this.http.get(this.apiurl + "SdContract", httpOptions);
  }
  Register(contract: any): Observable<any> {
    let user = JSON.parse(localStorage.getItem("user"));
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      })
    };
    return this.http.post(this.apiurl + "SdContract", contract, httpOptions);
  }

  GetSchedule(): Observable<any> {
    let user = JSON.parse(localStorage.getItem("user"));
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      })
    };
    return this.http.get(this.apiurl + "SdContract/schedule", httpOptions);
  }
  GetPreSchedule(): Observable<any> {
    let user = JSON.parse(localStorage.getItem("user"));
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      })
    };
    return this.http.get(this.apiurl + "SdContract/preschedule", httpOptions);
  }
}
