// Core
import debug from 'debug';

// Instruments
import { app } from './server.js';
import { getPort } from './utils/index.js';

// DB (подключаемся к базе данных)
import './db';

const dg = debug('server:main');

const PORT = getPort();

// Подключаемся к серверу
app.listen(PORT, () => {
    dg(`Server API is up on port ${PORT}`);
});
