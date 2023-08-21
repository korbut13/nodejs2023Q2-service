import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { LogLevels } from '../constants/loglevels';
import { writeToFile } from '../utils/writeToFile';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends ConsoleLogger {
  error(message: string, trace: string, name: string) {
    if (Number(process.env.LOG_LEVEL) >= LogLevels.error) {
      console.log(
        `${LogLevels[LogLevels.error].toUpperCase()}`,
        `[${name}]`,
        message,
      );
      console.log('TRACE', `[${name}]`, message);

      writeToFile(
        LogLevels[LogLevels.error] as keyof typeof LogLevels,
        message,
      );
      writeToFile(LogLevels[LogLevels.error] as keyof typeof LogLevels, trace);
    }
  }

  warn(message: string, name: string) {
    if (+process.env.LOG_LEVEL >= LogLevels.warn) {
      console.log(
        `${LogLevels[LogLevels.warn].toUpperCase()}`,
        `[${name}]`,
        message,
      );
      writeToFile(LogLevels[LogLevels.warn] as keyof typeof LogLevels, message);
    }
  }

  log(message: string, name: string) {
    if (+process.env.LOG_LEVEL >= LogLevels.log) {
      console.log(
        `${LogLevels[LogLevels.log].toUpperCase()}`,
        `[${name}]`,
        message,
      );
      writeToFile(LogLevels[LogLevels.log] as keyof typeof LogLevels, message);
    }
  }

  debug(message: string, name: string) {
    if (+process.env.LOG_LEVEL >= LogLevels.debug) {
      console.log(
        `${LogLevels[LogLevels.debug].toUpperCase()}`,
        `[${name}]`,
        message,
      );
      writeToFile(
        LogLevels[LogLevels.debug] as keyof typeof LogLevels,
        message,
      );
    }
  }

  verbose(message: string, name: string) {
    if (+process.env.LOG_LEVEL >= LogLevels.verbose) {
      console.log(
        `${LogLevels[LogLevels.verbose].toUpperCase()}`,
        `[${name}]`,
        message,
      );
      writeToFile(
        LogLevels[LogLevels.verbose] as keyof typeof LogLevels,
        message,
      );
    }
  }
}
