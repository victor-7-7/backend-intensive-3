// Core
import express from 'express';
import bodyParser from 'body-parser';

// Routers
import * as routers from './routers/index.js';

// Utils
import { NotFoundError, logger, notFoundErrLogger, validationErrLogger }
    from './utils/index.js';

const app = express();

app.use(bodyParser.json({ limit: '10kb' }));

app.use((req, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
        logger.info(JSON.stringify({
            reqMethod:    req.method,
            reqTimestamp: Date.now(),
            payload:      req.body,
        }));
    }
    next();
});

// Routers
app.use('/auth', routers.auth);
app.use('/users', routers.users);
app.use('/classes', routers.classes);
app.use('/lessons', routers.lessons);

// Если не попали ни в один из вышеуказанных рутов (auth, users, classes, lessons),
// либо попали, но внутри соответствующего рутера не нашли подходящий путь, то это
// означает, что эндпоинт невалиден. Движок начнет выполнять данный мидлвар (если
// рутер не кинул ошибку)
app.use((req, res, next) => {
    next(new NotFoundError('Unknown endpoint'));
});

app.use('*', (error, req, res, next) => {
    if (process.env.NODE_ENV !== 'test') {
        let msg = `${new Date().toISOString()} ${req.method}: ${req.originalUrl}`;

        if (error.name === 'NotFoundError') {
            notFoundErrLogger.error(msg);
        } else if (error.name === 'ValidationError') {
            msg += ` ${error.message}`;
            validationErrLogger.error(msg);
        } else {
            msg += ` ${error.name}: ${error.message}`;
            logger.error(msg);
        }

        res.status(error.statusCode || 400).send(error.message);
    } else {
        next(error); // Кейс для тестирования
    }
});

export { app };
