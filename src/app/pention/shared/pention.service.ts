import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PentionService {

  apiurl = "http://localhost:10012/api/";
  constructor(private http: HttpClient) { }

  getInfo(): Observable<any> {
    let user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }),
    };
    return this.http.get(this.apiurl + "InsureeInfo/pention/info", httpOptions);
  }

  getSalary(): Observable<any> {
    let user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }),
    };
    return this.http.get(this.apiurl + "InsureeInfo/pention/salary", httpOptions);
  }

  getOlgolt(): Observable<any> {
    let user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }),
    };
    return this.http.get(this.apiurl + "InsureeInfo/pention/olgolt", httpOptions);
  }

  getHistory(): Observable<any> {
    let user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }),
    };
    return this.http.get(this.apiurl + "InsureeInfo/pention/history", httpOptions);
  }
}
