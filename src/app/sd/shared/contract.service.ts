import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  apiurl = environment.apiurl + 'api/';

  constructor(private http: HttpClient) {}

  Check(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }),
    };
    return this.http.get(this.apiurl + 'SdContract/check', httpOptions);
  }
  Get(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }),
    };
    return this.http.get(this.apiurl + 'SdContract', httpOptions);
  }
  Register(contract: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }),
    };
    return this.http.post(this.apiurl + 'SdContract', contract, httpOptions);
  }
  Extend(contract: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }),
    };
    return this.http.post(this.apiurl + 'SdContract/extend', contract, httpOptions);
  }
  GetSchedule(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }),
    };
    return this.http.get(this.apiurl + 'SdContract/schedule', httpOptions);
  }
  GetPreSchedule(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }),
    };
    return this.http.get(this.apiurl + 'SdContract/preschedule', httpOptions);
  }
  GetPrint() {
    const user = JSON.parse(localStorage.getItem('user'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${user.token}`,
      responseType: 'text'
    });
    return this.http.get(this.apiurl + 'SdContract/print', { headers: headers, responseType: 'text' });
  }
  GetDom(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user'));
    // const httpOptions = {
    //     headers: new HttpHeaders({
    //         'Content-Type': 'application/text',
    //         Authorization: `Bearer ${user.token}`,
    //     }),
    // };
    // return this.http.get(this.apiurl + 'SdContract/dom', httpOptions);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${user.token}`,
      responseType: 'text'
    });
    return this.http.get(this.apiurl + 'SdContract/dom', { headers: headers, responseType: 'text' });
  }
}
