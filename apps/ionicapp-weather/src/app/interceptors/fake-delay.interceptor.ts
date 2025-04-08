import { HttpInterceptorFn } from '@angular/common/http';
import { delay } from 'rxjs/operators';

export const fakeDelayInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    delay(2000)
  );
};
