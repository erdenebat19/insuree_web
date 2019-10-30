import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ContractService {
  apiurl = "http://localhost:3000/";
  constructor(private http: HttpClient) {}

  GetStatus(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.get(this.apiurl + "GetSdContactStatus", httpOptions);
  }
}
