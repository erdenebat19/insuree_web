import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as signalR from '@aspnet/signalr';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class QpayService {
  private hubConnection: signalR.HubConnection;
  apiurl = environment.apiurl + 'api/';
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  Create(invoice: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }),
    };
    return this.http.post(this.apiurl + 'Invoice/qpay', invoice, httpOptions);
  }
  Check(paymentId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }),
    };
    return this.http.get(this.apiurl + 'Invoice/qpay?paymentId=' + paymentId, httpOptions);
  }
  BankList(dom: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }),
    };
    return this.http.get(this.apiurl + 'Invoice/qpay/banks?dom=' + dom, httpOptions);
  }
  BankAccount(dom: string, BankCode: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }),
    };
    return this.http.get(this.apiurl + 'Invoice/qpay/BankAccount?dom=' + dom + '&BankCode=' + BankCode, httpOptions);
  }
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('http://localhost:5000/payment-hub')
                            .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }
  public addCheckPaymentListener = () => {
    this.hubConnection.on('payment_check', (data) => {
      console.log(data);
      if (data.payment_id === sessionStorage.getItem('paymentId')) {
        this.router.navigate(['/main/view/sd/dashboard']);
      }
    });
  }
}
