import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BenefitService {
  apiurl = "https://data.ndaatgal.mn:8081/userwebapi/api/";
  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    let user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }),
    };
    return this.http.get(this.apiurl + "InsureeInfo/benefit", httpOptions);
  }
}
