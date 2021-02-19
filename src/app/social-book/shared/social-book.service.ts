import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SocialBookService {
    apiurl = environment.socialbookurl + 'api/';
    constructor(private http: HttpClient) {}

    Get(RegID: string): Observable<any> {
        const headers = new HttpHeaders({
            responseType: 'text'
        });
        return this.http.get(this.apiurl + 'book?regID=' + RegID, { headers: headers, responseType: 'text' });
    }
}
