
export const sessionOptions = {
    // От браузера будет приходить кука sessionid={session id}.
    // Сервер будет иметь сессионный объект session,
    // который будет прицеплен к каждому req-запросу.
    // key -> это имя куки, в которой на стороне браузера
    // будет храниться идентификатор сессии
    key:               'sessionid',
    // This is the secret used to sign the session ID cookie.
    // This can be either a string for a single secret, or an
    // array of multiple secrets.
    secret:            'pa$$w0rd',
    // Forces the session to be saved back to the session store,
    // even if the session was never modified during the request.
    // Если при обработке текущего запроса сессионные данные
    // для клиента не изменились, то не надо (false) их перезаписывать
    // в хранилище
    resave:            false, // default value is true
    // Force the session identifier cookie to be set on every
    // response. The expiration is reset to the original maxAge,
    // resetting the expiration countdown. Default value is false.
    // На каждый запрос от клиента сервер дает в заголовке ответа
    // новый сессионный идентификатор клиенту и сбрасывает счетчик
    rolling:           true, // reset max age on every use
    // Forces a session that is "uninitialized" to be saved to the store.
    // A session is uninitialized when it is new but not modified.
    saveUninitialized: false, // default value is true
    // По дефолту хранилищем для сессионных объектов
    // на сервере является MemoryStorage
    // storage: new MemoryStorage(),
    cookie:            {
        httpOnly: true,
        maxAge:   15 * 60 * 1000, // (in milliseconds) 15 min
    },
};

const usersData = [
    { email: 'jdoe@example.com', password: '123456' },
    { email: 'jdoe2@example.com', password: '1234567' },
];

// Check session
export const session_auth = async (req, res, next) => {
    // Мы имеем post-запрос на путь /sess/auth (со страницы /sess/login),
    // в теле которого есть свойства user и password

    // Имитируем поиск юзера в базе данных приложения
    const user = await usersData.find(
        // req.body.user - мыло, заданное юзером. dbUserEmail - мыло из базы
        ({ email: dbUserEmail }) => req.body.user === dbUserEmail,
    );
    // Если юзер с таким мылом в базе не найден, или найден, но
    // пароль, заданный юзером не совпадает с имеющимся в базе
    if (!user || user.password !== req.body.password) {
        return res.status(401).json({ message: 'Credentials are not valid' });
    }
    // Юзер предоставил валидные мыло и пароль.
    // Модифицируем сессионный объект
    req.session.loggedIn = true;
    req.session.username = req.body.user;
    // Поскольку сессионный объект модифицирован, то он будет
    // записан в сессионное хранилище, а к res-объекту будет
    // добавлен заголовок Set-Cookie с именем куки sessionid
    // и значением идентификатора сессии
    console.log('Session object:', req.session);
    next();
};
