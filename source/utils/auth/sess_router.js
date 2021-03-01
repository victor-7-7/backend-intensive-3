// Core
import express from 'express';
import bodyParser from 'body-parser';

import { session_auth } from './session_auth.js';
export const sessRouter = express.Router();

sessRouter.get('/', (req, res, next) => {
    if (req.session.loggedIn) {
        res.redirect('protected');
    } else {
        res.redirect('login');
    }
});

sessRouter.get('/protected', (req, res, next) => {
    // На эндпоинте logout session-объект удаляется
    if (!req.session || !req.session.loggedIn) {
        return res.redirect('login');
    }
    const currSession = req.session;
    const { cookie } = req.headers;

    res.setHeader('content-type', 'text/html');
    res.status(200).send(`
        <h1>Welcome session protected page!</h1>
        <p>-----------------------------</p>
        <h2>From browser (req.headers.cookie):</h2>
        <p>${cookie}</p>
        <p>-----------------------------</p>
        <h2>On server side (req.session object):</h2>
        <p>${JSON.stringify(currSession, null, 2)}</p>
    `);
});

sessRouter.get('/login', (req, res, next) => {
    res.setHeader('content-type', 'text/html');

    // https://developer.mozilla.org/ru/docs/Web/HTML/Element/form
    /* Варианты атрибута method для form-тэга.
    * post: Соответствует HTTP POST методу, данные из формы включаются
    * в тело формы и посылаются на сервер.
    * get: Соответствует GET методу, данные из формы добавляются к URI атрибута
    * action, их разделяет '?', и полученный URI посылается на сервер.
    * Используйте этот метод, когда форма содержит только ASCII символы
    * и не имеет побочного эффекта.
    * Атрибут enctype для form-тэга по дефолту имеет
    * значение - application/x-www-form-urlencoded */

    return res.status(303).send(`
            <head>
                <title>Login</title>
            </head>
            <form action="/sess/auth" method="POST">
                Email : <input name="user" type="email"/><br><br>
                Password : <input name="password" type="password"/><br><br>
                <input type="submit" value="Submit"/>
            </form>
        `);
    // Sometimes the req.body shows {} if you forgot to put the
    // name attribute to the form input fields
});

// Про bodyParser - https://medium.com/@gohitvaranasi/how-to-use-body-parser-in-express-to-handle-different-post-requests-c58c29d45b46
sessRouter.post('/auth', bodyParser.urlencoded({
    extended: false, type:     '*/x-www-form-urlencoded' }), session_auth,
(req, res, next) => {
    res.redirect('protected');
});

sessRouter.get('/logout', (req, res) => {
    // Удаляем сессионную запись из хранилища и свойство session
    // из req-объекта
    req.session.destroy((error) => {
        // cannot access session here
        console.log('On session destroy callback. Error param:', error);
    });
    res.send('Thank you! Visit again');
});
