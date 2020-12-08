import { format, createLogger, transports } from 'winston';

const { combine, timestamp, printf } = format;

const logFormat = printf(({ message, timestamp }) => {
    return `${timestamp} ${message}`;
});

export const logger = createLogger({
    format:     combine(timestamp(), logFormat),
    level:      'debug',
    transports: [ new transports.Console() ],
});
