import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routes, AppRoutingModule } from './app.routes';
import { RouterModule } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SidebarModule } from './shared/ui/sidebar/sidebar.module';
import { ErrorReportComponent } from './shared/ui/error-report/error-report.component';
import { SharedModule } from './shared/shared.module';
import { GoogleAnalyticsServiceService } from './shared/shared/google-analytics-service.service';

@NgModule({
  declarations: [AppComponent, ErrorReportComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    RecaptchaModule.forRoot(),
    HttpClientModule,
    SidebarModule,
    SharedModule
  ],
  providers: [JwtHelperService, GoogleAnalyticsServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    protected _googleAnalyticsService: GoogleAnalyticsServiceService
  ) {}
}
