import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { AlertService } from "./alert.service";
import { NotificationService } from "./notification.service";
import { Router } from "@angular/router";

// import { LoggingService } from './logging.service';
// import { ErrorService } from './error.service';
// import { NotificationService } from './notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  // Error handling is important and needs to be loaded first.
  // Because of this we should manually inject the services with Injector.
  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse) {
    // const errorService = this.injector.get(ErrorService);
    // const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(NotificationService);
    const alertService = this.injector.get(AlertService);
    const router = this.injector.get(Router);
    let message;
    let stackTrace;

    if (error instanceof HttpErrorResponse) {
      // Server Error
      // message = errorService.getServerMessage(error);
      // stackTrace = errorService.getServerStack(error);
      // notifier.showError(message);
      // if (error.status.toString().substring(0, 1) == "4")
      //   alertService.error(error.message);
      // else
      if (error.status.toString().substring(0, 1) == "5")
        alertService.error(error.message, "global");
      if (error.status == 0) {
        let url = error.url ? error.url + ": " : "";
        alertService.error(
          url + "Сервертэй холбогдох боломжгүй байна.",
          "global"
        );
      }
      // if (error.status.toString().substring(0, 1) == "5")
      // else router.navigate(["/error"]);
    } else {
      // Client Error
      // message = errorService.getClientMessage(error);
      // stackTrace = errorService.getClientStack(error);
      // notifier.showError(message);
    }

    // Always log errors
    // logger.logError(message, stackTrace);
    //window.location.href = "/#/error";
    // console.log(error);
  }
}
