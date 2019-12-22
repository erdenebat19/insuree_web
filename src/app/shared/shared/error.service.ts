import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ErrorService {
  getClientErrorMessage(error: Error): string {
    return error.message ? error.message : error.toString();
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    return navigator.onLine ? error.message : "No Internet Connection";
  }
  getInlineError(error: HttpErrorResponse): string {
    let err: string;
    if (error.status.toString().substring(0, 1) == "4") {
      err = error.error ? error.error : error.toString();
    } else {
      if (error.status == 0) {
        let url = error.url ? error.url + ": " : "";
        err = url + "Сервертэй холбогдох боломжгүй байна.";
      }
    }
    return err;
  }
}
