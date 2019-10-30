import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ReferenceService {
  //apiurl = "https://data.ndaatgal.mn:8081/userwebapi/api/References/";
  apiurl = "http://localhost:3000/";
  constructor(private http: HttpClient) {}

  AMClassList(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.get(this.apiurl + "AMClasses", httpOptions);
  }
  BankList(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.get(this.apiurl + "Banks", httpOptions);
  }
  GetMinSalary(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.get(this.apiurl + "GetMinSalary", httpOptions);
  }
  ContractPeriods(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.get(this.apiurl + "ContractPeriods", httpOptions);
  }
}
