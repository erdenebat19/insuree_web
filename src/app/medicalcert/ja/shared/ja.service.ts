import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
 providedIn: 'root',
})
export class JaService {
 apiurl = environment.apiurl + 'api/MedicalCert/';
 constructor(private http: HttpClient) {}

 medicalJA(): Observable<any> {
  const user = JSON.parse(localStorage.getItem('user'));
  const httpOptions = {
   headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user.token}`,
   }),
  };
  return this.http.get(this.apiurl + 'ja', httpOptions);
 }

 medicalJAsave(data: any): Observable<any> {
  const user = JSON.parse(localStorage.getItem('user'));
  const httpOptions = {
   headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user.token}`,
   }),
  };
  return this.http.post(this.apiurl + 'save', data, httpOptions);
 }
}
