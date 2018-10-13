import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  apiurl = "http://localhost:10012/api/";
  constructor(private http: HttpClient) { }

  login(userName: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    const data = {
        'UserName': userName,
        'Password': password
    };
    return this.http.post<any>(this.apiurl + "auth/login", data, httpOptions);
  }
}
