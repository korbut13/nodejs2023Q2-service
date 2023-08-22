import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import * as cookieParser from 'cookie-parser';
import { MyLogger } from './logger/logger.service';
import { writeToFile } from './utils/writeToFile';
import { LogLevels } from './constants/loglevels';

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useLogger(new MyLogger());

  await app.listen(port);

  process.on('uncaughtException', (err) => {
    console.log(err);
    writeToFile(
      LogLevels[LogLevels.error] as keyof typeof LogLevels,
      err.message,
    );
  });

  process.on('unhandledRejection', (err) => {
    console.log(err);
    writeToFile(
      LogLevels[LogLevels.error] as keyof typeof LogLevels,
      `unhandledRejection: ${err}`,
    );
  });
}
bootstrap();
