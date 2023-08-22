import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
} from 'fs';
import * as path from 'path';
import { LogLevels } from '../constants/loglevels';

export function writeToFile(level: keyof typeof LogLevels, message: string) {
  const logsFileDir = path.join(process.cwd(), 'logs');
  const errorsFileDir = path.join(process.cwd(), 'errors');

  const line = `{"level": "${level}", "message": "${message}", "timestamp": "[${new Date().toISOString()}]"}\n`;

  let folder = logsFileDir;
  let prefix = 'logs';

  if (level === LogLevels[LogLevels.error]) {
    folder = errorsFileDir;
    prefix = 'errors';
  }

  if (!existsSync(folder)) mkdirSync(folder);

  const files = readdirSync(folder);
  const lastFile = files[files.length - 1];
  let lastFileSize = null;

  if (lastFile) lastFileSize = statSync(path.join(folder, lastFile)).size;

  if (lastFileSize && lastFileSize <= +process.env.LOG_FILE_SIZE) {
    appendFileSync(path.join(folder, lastFile || `${prefix}-0.log`), line, {
      encoding: 'utf8',
      mode: 438,
    });
  } else {
    appendFileSync(path.join(folder, `${prefix}-${files.length}.log`), line, {
      encoding: 'utf8',
      mode: 438,
    });
  }
}
