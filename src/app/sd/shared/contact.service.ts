import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ContactService {
  apiurl = "http://localhost:3000/";
  constructor(private http: HttpClient) {}

  Get(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.get(this.apiurl + "contact", httpOptions);
  }
}
