
export const sessionOptions = {
    key:               'user', // cookie name
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
        maxAge:   15 * 60 * 1000, // 15 min
    },
};

const usersData = [
    { email: 'jdoe@example.com', password: '123456' },
    { email: 'jdoe2@example.com', password: '1234567' },
];

// Authorization function
export const session_auth = async (req, res, next) => {
    // Если сессионное свойство user еще не создано
    if (!req.session.user) {
        const auth = req.headers.authorization;
        // Если клиент не предоставил данных для авторизации
        if (!auth) {
            // Предлагаем пользователю залогиниться
            res.setHeader('WWW-Authenticate', 'Basic');

            return  res.sendStatus(401);
        }
        // jdoe@example.com:123456 -> amRvZUBleGFtcGxlLmNvbToxMjM0NTY=
        // В хедере Authorization запроса должна быть строка
        // Basic amRvZUBleGFtcGxlLmNvbToxMjM0NTY=
        console.log(auth);

        // Строка 'Basic amRvZUBleGFtcGxlLmNvbToxMjM0NTY=' сплитится
        // в массив из двух элементов
        const [ type, credentials ] = auth.split(' ');
        // Второй элемент превращаем в строку через буфер и сплитим на мыло и пароль
        const [ reqUserEmail, password ] = Buffer.from(credentials, 'base64')
            .toString()
            .split(':');
        // Simulate DB search
        const user = await usersData.find(
            // reqUserEmail - мыло, заданное юзером. dbUserEmail - мыло из базы
            ({ email: dbUserEmail }) => reqUserEmail === dbUserEmail,
        );
        // Если юзер с таким мылом в базе не найден, или найден, но
        // пароль, заданный юзером не совпадает с имеющимся в базе
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'credentials are not valid' });
        }
        // Создаем куку user.email и цепляем ее к сессии клиента
        req.session.user = { email: reqUserEmail };
    } else {
        // Извлекаем куку из сессии
        const {user} = req.session;
        // Если у куки user нет свойства email
        if (!user.email) {
            return res.status(401)
                .json({message: 'credentials are not valid'});
        }
    }
    res.redirect('/');
};
