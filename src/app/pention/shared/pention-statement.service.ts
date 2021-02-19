import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PentionStatementService {
  // АА62082009
  apiurl = environment.socialbookurl + 'api/';
  constructor(private http: HttpClient) {}

  Get(RegID: string): Observable<any> {
      const headers = new HttpHeaders({
          responseType: 'text'
      });
      RegID = 'АА62082009';
      return this.http.get(this.apiurl + 'tetbook?regID=' + RegID, { headers: headers, responseType: 'text' });
  }
}
