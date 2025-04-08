import { HttpInterceptorFn } from '@angular/common/http';
import { delay, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const delayMs = 2000;

export const fakeDelayInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    delay(delayMs),
    catchError(error => {
      console.error('Error occurred:', error);
      return throwError(() => error).pipe(delay(delayMs));
    })
  );
};
