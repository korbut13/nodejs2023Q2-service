import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLogger } from './logger.service';

@Injectable()
export class LoggerServiceMiddleware implements NestMiddleware {
  private logger = new MyLogger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { body, query, originalUrl, method } = request;

    response.on('finish', () => {
      const { statusCode } = response;
      const message = `${method} ${originalUrl} ${statusCode} query params: ${JSON.stringify(
        query,
      )}, body: ${JSON.stringify(body)}\n`;

      if (statusCode < 400) this.logger.log(message, 'HTTP');
    });

    next();
  }
}
