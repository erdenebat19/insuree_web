import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PentionAccountService {
  apiurl = "http://localhost:10012/api/";
  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    let user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }),
    };
    return this.http.get(this.apiurl + "InsureeInfo/ndans", httpOptions);
  }

  SplitData(data: any[]): any[][] {
    let sd: any[][] = [];
    sd[0] = [];
    sd[1] = [];
    for (var i = 0; i < data.length; i++) {
      sd[0].push(data[i].year);
      sd[1].push(data[i].uld);
    }
    return sd;
  }

}
