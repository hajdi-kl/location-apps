import { HttpInterceptorFn } from '@angular/common/http';
import { delay, catchError, concatMap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

const delayMs = 2000;

export const fakeDelayInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    delay(delayMs),
    catchError(error => {
      return of(null).pipe(
        delay(delayMs),
        concatMap(() => throwError(() => error))
      );
    })
  );
};
