import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import * as cookieParser from 'cookie-parser';

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  await app.listen(port);
}
bootstrap();
