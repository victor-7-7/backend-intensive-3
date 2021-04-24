
import mongoose from 'mongoose';
import debug from 'debug';

const dg = debug('db');

const mongooseOptions = {
    promiseLibrary:     global.Promise,
    poolSize:           50, // сколько можно одновременно открыть коннектов
    keepAlive:          30000, // время проверки коннекта - живой или нет
    connectTimeoutMS:   5000, // время для попытки законнектиться к базе
    // reconnectTries: Number.MAX_SAFE_INTEGER, // несовместим с useUnifiedTopology
    // reconnectInterval: 5000, // несовместим с useUnifiedTopology
    useNewUrlParser:    true, // используется в новой версии мангуса
    useFindAndModify:   false, // для обратной совместимости со старыми версиями
    useCreateIndex:     true, // для обратной совместимости со старыми версиями
    useUnifiedTopology: true, // To opt in to using the new topology engine
};

mongoose.connect(
    'mongodb://localhost:27017/backend_db',
    mongooseOptions,
    (error) => {
        if (error) {
            dg(`Backend_db connection err: ${error.message}`);
        } else {
            dg('Backend_db connected!');
        }
    },
);

