
import express from 'express';
import passport from 'passport';
import jsonwebtoken from 'jsonwebtoken';
import { secret, usersData } from './memory_store.js';
export const pass_jwt_router = express.Router();

//-------------------------------------------
// Register a new user
pass_jwt_router.post('/register', async (req, res, next) => {
    // req.body must have username & password properties

    // Simulate DB search
    const user = await usersData.find(
        ({ username: dbUserName }) => req.body.username === dbUserName,
    );

    if (user) {
        return res.status(409).json({
            success: false,
            msg:     `User ${user.username} already exists` });
    }

    const newUser = {
        _id:      usersData.length + 1,
        username: req.body.username,
        password: req.body.password,
    };

    usersData.push(newUser);

    res.json({
        success: true,
        msg:     `New user ${newUser.username} created!` });
});

function issueJWT(user) {
    const expiresIn = '7m'; // 7 минут

    const payload = {
        sub: user._id,
        iat: Date.now(),
    };
    // For signing with asymmetric algorithm [RSA SHA256] you must set
    // option - algorithm: 'RS256'. Default option - HS256 [HMAC SHA256]
    const signedToken = jsonwebtoken.sign(payload, secret, { expiresIn: expiresIn });

    return {
        // Клиент при отправке запроса на защищенный рут должен будет
        // поместить этот токен в заголовок Authorization
        token:   'Bearer ' + signedToken,
        expires: expiresIn,
    };
}

//-------------------------------------------
// Validate an existing user and issue a JWT
pass_jwt_router.post('/login', async (req, res, next) => {
    // req.body must have username & password properties

    // Simulate DB search
    const user = await usersData.find(
        ({ username: dbUserName }) => req.body.username === dbUserName,
    );

    if (!user) {
        return res.status(401).json({
            success: false,
            msg:     `could not find user: ${req.body.username}` });
    }

    if (req.body.password === user.password) {
        const tokenObject = issueJWT(user);

        res.setHeader('X-Token', tokenObject.token);

        res.status(200).json({
            success:   true,
            expiresIn: tokenObject.expires,
            msg:       'Login success!',
        });
    } else {
        res.status(401).json({
            success: false,
            msg:     'you entered the wrong password' });
    }
});

//-------------------------------------------
// passport.authenticate(...) -> Passport will verify the supplied JWT with
// the jsonwebtoken verify method. Если токен валидный (для стратегии 'jwt'
// в req-заголовке Authorization должен быть ВАЛИДНЫЙ токен [мы сконфигурировали
// опцию jwtFromRequest как fromAuthHeaderAsBearerToken()]), то будет вызвана
// функция function(jwt_payload, done), переданная вторым параметром
// в JwtStrategy-конструктор
pass_jwt_router.get('/protected',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.status(200).json({
            success: true,
            msg:     'You are successfully authenticated to this route!'});
    });
