import * as winston from 'winston';
import moment from 'moment-timezone';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, printf } = winston.format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

export const logger = winston.createLogger({
  format: combine(winston.format.timestamp({ format: () => moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss') }), customFormat),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: 'logs',
      filename: `%DATE%.log`,
    }),
    new DailyRotateFile({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: 'logs/error',
      filename: `%DATE%.error.log`,
    }),
  ],
});
