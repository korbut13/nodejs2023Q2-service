import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { MyLogger } from '../logger/logger.service';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class ExceptionFilterService implements ExceptionFilter {
  private logger = new MyLogger('HttpException');
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception, host: ArgumentsHost) {
    const httpAdapter = this.httpAdapterHost.httpAdapter;
    const ctx = host.switchToHttp();
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const request = ctx.getRequest<Request>();

    const { method, originalUrl, query, body } = request;

    const response = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message:
        exception instanceof HttpException
          ? exception.message
          : 'Internal Server Error',
    };

    httpAdapter.reply(ctx.getResponse(), response, statusCode);

    const message = `${method} ${originalUrl} ${statusCode} query params: ${JSON.stringify(
      query,
    )}, body: ${JSON.stringify(body)}\n`;

    if (exception instanceof HttpException) {
      this.logger.error(message, exception.stack, exception.name);
    } else if (exception instanceof Error) {
      this.logger.error(message, exception.stack, 'Internal Server Error');
    } else {
      this.logger.error(message, 'no-trace', 'Internal Server Error');
    }
  }
}
