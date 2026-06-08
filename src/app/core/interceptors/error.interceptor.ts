import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from '../../shared/services/toastr.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  debugger;
  const toatrService = inject(ToastrService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let msg = 'Something went wrong';

      if (error.status === 400) {
        if (error.error?.errors) {
          return throwError(() => error);
        } else if (error.error?.Success === false && error.error?.Message) {
          msg = error.error.Message;
          toatrService.error(msg);
        }
      }
      return throwError(() => error);
    }),
  );
};
