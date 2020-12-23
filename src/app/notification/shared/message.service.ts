import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  // apiurl = "https://data.ndaatgal.mn:8081/userwebapi/api/";
  apiurl = environment.apiurl + 'api/Notification/';
  private Unread: number;
  constructor(private http: HttpClient) {}

  List(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }),
    };
    return this.http.get(this.apiurl, httpOptions);
  }
  GetLast(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }),
    };
    return this.http.get(this.apiurl + 'Last', httpOptions);
  }
  UnreadNum(): Observable<number> {
    const user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }),
    };
    return this.http.get<number>(this.apiurl + 'UnreadNum', httpOptions);
  }
  Read(Id): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }),
    };
    return this.http.post(this.apiurl + 'Read?Id=' + Id, Id, httpOptions);
  }
  GetUnreadNum() {
    return this.Unread;
  }
  SetUnreadNum(unread) {
    this.Unread = unread;
  }
  Confirm(message): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }),
    };
    const data = {
      Id: message.id,
      Confirm: true
    };
    return this.http.post(this.apiurl + message.confirmUrl, data, httpOptions);
  }
}
