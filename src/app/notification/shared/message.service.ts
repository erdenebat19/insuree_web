import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  // apiurl = "https://data.ndaatgal.mn:8081/userwebapi/api/";
  apiurl = "http://localhost:10012/api/Notification/";
  private Unread: number;
  // apiurl = "http://localhost:3000/";
  constructor(private http: HttpClient) {}

  List(): Observable<any> {
    let user = JSON.parse(localStorage.getItem("user"));
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      })
    };
    return this.http.get(this.apiurl, httpOptions);
  }
  GetLast(): Observable<any> {
    let user = JSON.parse(localStorage.getItem("user"));
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      })
    };
    return this.http.get(this.apiurl + "Last", httpOptions);
  }
  UnreadNum(): Observable<number> {
    let user = JSON.parse(localStorage.getItem("user"));
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      })
    };
    return this.http.get<number>(this.apiurl + "UnreadNum", httpOptions);
  }
  Read(Id): Observable<any> {
    console.log(Id);
    let user = JSON.parse(localStorage.getItem("user"));
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      })
    };
    return this.http.post(this.apiurl + "Read?Id=" + Id, Id, httpOptions);
  }
  GetUnreadNum() {
    return this.Unread;
  }
  SetUnreadNum(unread) {
    this.Unread = unread;
  }
}
