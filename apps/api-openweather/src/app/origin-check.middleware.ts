import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class OriginCheckMiddleware implements NestMiddleware {
  use(req: any, _res: any, next: () => void) {
    const allowedOrigins = [undefined, 'http://localhost:4200', 'https://hajdi.com']; // TODO remove undefined here
    const origin = req.headers.origin;

    if (!allowedOrigins.includes(origin)) {
      // Temprorarily disable the origin check

      // throw new HttpException(
      //   'Access Forbidden',
      //   HttpStatus.FORBIDDEN,
      // );
    }
    next();
  }
}
