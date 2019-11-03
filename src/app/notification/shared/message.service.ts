import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  // apiurl = "https://data.ndaatgal.mn:8081/userwebapi/api/";
  apiurl = "http://localhost:3000/";
  constructor(private http: HttpClient) {}

  List(): Observable<any> {
    let user = JSON.parse(localStorage.getItem("user"));
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.get(this.apiurl + "Messages", httpOptions);
  }
  GetLast(): Observable<any> {
    let user = JSON.parse(localStorage.getItem("user"));
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.get(this.apiurl + "LastMessage", httpOptions);
  }
}
