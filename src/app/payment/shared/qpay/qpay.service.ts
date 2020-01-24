import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class QpayService {
  apiurl = "http://localhost:10012/api/";
  constructor(private http: HttpClient) {}

  Create(invoice: any): Observable<any> {
    let user = JSON.parse(localStorage.getItem("user"));
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      })
    };
    return this.http.post(this.apiurl + "Invoice", invoice, httpOptions);
  }
  Check(paymentId: string): Observable<any> {
    let user = JSON.parse(localStorage.getItem("user"));
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      })
    };
    return this.http.get(
      this.apiurl + "Invoice?paymentId=" + paymentId,
      httpOptions
    );
  }
}
