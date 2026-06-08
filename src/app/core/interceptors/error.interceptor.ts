import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from '../../shared/services/toastr.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let msg = error.error.Message;

      if (error.status === 400 && error.error?.errors) {
        return throwError(() => error);
      } else if (error.status === 400 && error.error?.Success === false && error.error?.Message) {
        toastrService.error(msg);
      } else if (error.status === 401) {
        toastrService.error(msg);
      } else if (error.status === 403) {
        toastrService.error(msg);
      } else if (error.status === 500) {
        toastrService.error('Internal server error. Try again later.');
      } else {
        toastrService.error(msg);
      }

      return throwError(() => error);
    }),
  );
};
