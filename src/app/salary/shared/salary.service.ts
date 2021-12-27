import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  apiurl = environment.apiurl + 'api/';
  constructor(private http: HttpClient) { }

  getSalary(byear: number, eyear: number): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }),
    };
    return this.http.get(this.apiurl + 'InsureeInfo/salary?byear=' + byear + '&eyear=' + eyear, httpOptions);
  }
}
