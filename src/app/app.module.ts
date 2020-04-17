import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RecaptchaModule } from "ng-recaptcha";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { routes } from "./app.routes";
import { RouterModule } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ErrorReportComponent } from "./shared/ui/error-report/error-report.component";
import { GoogleAnalyticsServiceService } from "./shared/shared/google-analytics-service.service";
import { GlobalErrorHandler } from "./shared/shared/global-error-handle";
import { ServerErrorInterceptor } from "./shared/shared/server-error.interceptor";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared/shared.module";
import { ShareDataService } from "./shared/shared/share-data.service";
import { ModalService } from "./shared/ui/modal.service";

@NgModule({
  declarations: [AppComponent, ErrorReportComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),
    RecaptchaModule.forRoot(),
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    ShareDataService,
    JwtHelperService,
    GoogleAnalyticsServiceService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    protected _googleAnalyticsService: GoogleAnalyticsServiceService
  ) {}
}
