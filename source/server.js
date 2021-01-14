// Core
import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';

//Routers
import * as routers from './routers/index.js';

const app = express();

const logger = winston.createLogger({
    level:      'debug',
    format:     winston.format.simple(),
    transports: [ new winston.transports.Console() ],
});

app.use(bodyParser.json({ limit: '10kb' }));

app.use((req, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
        logger.info(JSON.stringify({
            reqMethod:    req.method,
            reqTimestamp: Date.now(),
            payload:      req.body,
        }));
        /*
          new Date().toTimeString() -> 22:40:57 GMT+0700 (GMT+07:00)
          new Date().toLocaleTimeString() -> 22:37:24
          new Date().toDateString() -> Wed Jan 13 2021
          new Date().toLocaleString() -> Wed Jan 13 2021 22:28:29 GMT+0700 (GMT+07:00)
          new Date().toUTCString() -> Wed, 13 Jan 2021 15:42:38 GMT
          new Date().getTime() -> 1610552701183 <- ms since 01.01.70 00:00:00
          Date.now() -> 1610552701183 <- ms since 01.01.70 00:00:00
        */
    }
    next();
});

// Routers
app.use('/auth', routers.auth);
app.use('/users', routers.users);
app.use('/classes', routers.classes);
app.use('/lessons', routers.lessons);

export { app };
