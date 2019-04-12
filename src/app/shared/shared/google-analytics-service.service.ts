import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
declare var ga:Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsServiceService {
  constructor(router: Router) {
    if (!environment.production) return; // <-- If you want to enable GA only in production
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.url);
        ga('send', 'pageview');
      }
    })
  }
}
