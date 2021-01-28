// https://www.npmjs.com/package/winston
// Formatting - https://github.com/winstonjs/logform
import winston from 'winston';
const { format, transports, createLogger } = winston;
const { simple, combine, colorize, printf } = format;


const logger = createLogger({
    level:      'debug',
    format:     simple(),
    transports: [
        // Write logs with level `error` and below to `error.log`
        new transports.File({
            filename: './logs/errors.log',
            level:    'error',
        }),
        // Write all logs with level `debug` and below to console
        new transports.Console({
            format: combine(colorize(), simple()),
        }),
    ],
});

// https://github.com/winstonjs/logform#info-objects
// Объект-параметр info имеет как минимум level и message свойства.
const briefFormat = printf((info) => {
    return info.message;
});

const validationErrLogger = createLogger({
    level:      'error',
    format:     briefFormat,
    transports: [
        new transports.File({
            filename: './logs/validation_errors.log',
        }),
        new transports.Console({
            format: combine(colorize(), simple()),
        }),
    ],
});

const notFoundErrLogger = createLogger({
    level:      'error',
    format:     briefFormat,
    transports: [
        new transports.File({
            filename: './logs/not_found_errors.log',
        }),
        new transports.Console({
            format: combine(colorize(), simple()),
        }),
    ],
});

export { logger, notFoundErrLogger, validationErrLogger };
