import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ContactService {
    apiurl = environment.apiurl + 'api/';
    constructor(private http: HttpClient) {}

    Get(dom: string): Observable<any> {
        const user = JSON.parse(localStorage.getItem('user'));
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            }),
        };
        return this.http.get(this.apiurl + 'SdContract/OfficeContact?dom=' + dom, httpOptions);
    }
}
