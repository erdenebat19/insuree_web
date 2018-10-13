import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  apiurl = "http://localhost:10012/api/";
  constructor(private http: HttpClient) { }

  getSalary(byear: number, eyear: number, captchaResponse: string): Observable<any> {
    let user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }),
    };
    return this.http.get(this.apiurl + "InsureeInfo/salary?byear=" + byear + "&eyear=" + eyear + "&captchaResponse=" + captchaResponse, httpOptions);
  }
}
