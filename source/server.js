// Core
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';

// Routers
import * as routers from './routers/index.js';
import { pass_jwt_router } from './utils/auth/pass_jwt.js';

// Utils
import { NotFoundError, logger, notFoundErrLogger, validationErrLogger,
    sessionOptions } from './utils/index.js';
import { passConfig } from './utils/auth/pass_config.js';

const app = express();

app.use(bodyParser.json({ limit: '10kb' }));

app.use((req, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
        logger.info(JSON.stringify({
            method:      req.method,
            originalUrl: req.originalUrl,
            body:        req.body,
            timestamp:   Date.now(),
        }));
    }
    next();
});

app.get('/', (req, res, next) => {
    res.setHeader('content-type', 'text/html');
    res.status(200).send(`
        <h1>Welcome home page!</h1>
    `);
});

//===============================================
// Для прода включаем безопасность куков
if (process.env.NODE_ENV === 'production') {
    // Если браузер не будет иметь HTTPS connection,
    // то он не пошлет куки серверу
    sessionOptions.cookie.secure = true;
}
// Подключив механизм сессий, во всех запросах теперь
// будем иметь сессионное свойство req.session
app.use(session(sessionOptions));
// Используем express-session для аутентификации и авторизации на baseUrl /sess
// Можно залогиниться через браузер (email: 'jdoe@example.com', password: '123456')
app.use('/sess', routers.sess);

//===============================================
// Конфигурируем глобальный объект passport, передав его
// в функцию конфигурации
passConfig(passport);
// Инициализируем сконфигурированный паспорт
app.use(passport.initialize());
// Используем jwt-паспорт для аутентификации и авторизации на baseUrl /passjwt
// Требуется регистрация через Postman
app.use('/passjwt', pass_jwt_router);

//===============================================
// Routers
app.use('/auth', routers.auth); // post:/login, post:/logout
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
