// Core
import { createLogger, format, transports } from 'winston';
import path from 'path';

const { combine, timestamp, printf } = format;
const logFormat = printf(({ message, timestamp }) => `${timestamp} ${message}`);
const filename = path.resolve(path.join('logs', 'errors.log'));

export const errorLogger = createLogger({
    format:     combine(timestamp(), logFormat),
    level:      'error',
    transports: [ new transports.File({ filename, level: 'error' }) ],
});
