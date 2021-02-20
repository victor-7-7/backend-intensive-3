
import passportJwt from 'passport-jwt';
const { Strategy, ExtractJwt } = passportJwt;
import { secret, usersData } from './memory_store.js';

const jwtOptions = {
    secretOrKey:    secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // List of strings with the names of the allowed algorithms.
    algorithms:     [ 'HS256' ],
};

// Функция, которая конфигурирует переданный в нее глобальный объект passport
export const passConfig = (passport) => {
    // Всякий раз, когда в приложении будет вызываться middleware метод
    // passport.authenticate(...), и при условии, что req содержит необходимые
    // данные для обозначенной первым параметром стратегии (например, для
    // стратегии 'jwt' в req-заголовке Authorization должен быть ВАЛИДНЫЙ токен
    // [в нашем случае Bearer токен]), тогда внутри аутентификационной
    // процедуры будет вызываться функция верификации, переданная вторым
    // аргументом в конструктор стратегии [function(jwt_payload, done)].
    // Если же заголовка Authorization в запросе не будет, либо будет, но
    // токен не валидный, то функция верификации вызвана не будет.
    // В этом случае метод authenticate(...) отправит клиенту
    // ответ 401 Unauthorized.
    // The JWT payload is passed into the verify callback
    passport.use(new Strategy(jwtOptions, function(jwt_payload, done) {
        // jwt_payload: { "sub": "1", "iat": 1613268577126, "exp": 1613268663526 }
        // sub - идентификатор юзера, iat и exp - в секундах!
        console.log(jwt_payload);

        const user = usersData.find(
            ({ _id: dbId }) => jwt_payload.sub === dbId,
        );

        if (user) { // <- юзер с таким _id найден в базе
            console.log('User:', user);

            return done(null, user);
        }
        done(null, false); // <- юзер с таким _id не найден
    }));
};
