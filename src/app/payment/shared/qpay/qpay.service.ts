import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QpayService {
  apiurl = environment.apiurl + 'api/';
  constructor(private http: HttpClient) {}

  Create(invoice: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }),
    };
    return this.http.post(this.apiurl + 'Invoice', invoice, httpOptions);
  }
  Check(paymentId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }),
    };
    return this.http.get(this.apiurl + 'Invoice?paymentId=' + paymentId, httpOptions);
  }
}
