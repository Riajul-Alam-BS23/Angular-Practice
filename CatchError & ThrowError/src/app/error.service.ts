import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  errorMsg:any;
  constructor() { }
  handleError(err: HttpErrorResponse) {
  let errorMsg:any;
    console.log(err);
    if (!err.error || err.error.error) {
      console.log("Network error: " + err.error);
      errorMsg="There is some unknown error. Please try again after sometimes.";
    } else {
      if (err.error.error == 'permission denied') {
        errorMsg = "You don't have permission to perform this action.";
      }
    }
    return throwError(() => new Error(errorMsg));
  }
}
