import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class OriginCheckMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const allowedOrigins = [undefined, 'http://localhost', 'https://hajdi.com']; // TODO remove undefined here
    const origin = req.headers.origin;

    if (!allowedOrigins.includes(origin)) {
      throw new HttpException(
        'Access Forbidden',
        HttpStatus.FORBIDDEN,
      );
    }
    next();
  }
}
