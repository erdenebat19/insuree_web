import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
 providedIn: 'root',
})
export class UnemploymentService {
 apiurl = environment.apiurl;
 constructor(private http: HttpClient) {}

 jobSeeker(): Observable<any> {
  const user = JSON.parse(localStorage.getItem('user'));
  const httpOptions = {
   headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user.token}`,
   }),
  };
  return this.http.get(this.apiurl + 'api/TmjAjilguidel/JobSeeker', httpOptions);
 }

 WorkMonth(): Observable<any> {
  const user = JSON.parse(localStorage.getItem('user'));
  const httpOptions = {
   headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user.token}`,
   }),
  };
  return this.http.get(this.apiurl + 'api/TmjAjilguidel/WorkMonthList', httpOptions);
 }

 peopleInfo(): Observable<any> {
  const user = JSON.parse(localStorage.getItem('user'));
  const httpOptions = {
   headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user.token}`,
   }),
  };
  return this.http.get(this.apiurl + 'api/people', httpOptions);
 }

 requestList(): Observable<any> {
  const user = JSON.parse(localStorage.getItem('user'));
  //   console.log(user);
  const httpOptions = {
   headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user.token}`,
   }),
  };
  return this.http.get('https://app.ndaatgal.mn:811/tmj.ajil.api/api/ajilguidel/List?RegID=' + user.userID, httpOptions);
 }

 requestSave(data: any): Observable<any> {
  const user = JSON.parse(localStorage.getItem('user'));
  const httpOptions = {
   headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user.token}`,
   }),
  };
  return this.http.post('https://app.ndaatgal.mn:811/tmj.ajil.api/api/ajilguidel/CreateRequest', data, httpOptions);
 }
}
