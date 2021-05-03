
import mongoose from 'mongoose';

// Схема для лог-документа
const logSchema = new mongoose.Schema({
    method:   String, // метод запроса - req.method
    path:     String, // эндпоинт - req.originalUrl
    duration: {
        start: Date, // ?
        end:   Date, // ?
    },
    // https://mongoosejs.com/docs/schematypes.html#mixed
    payload: {},
    agent:   String, // тип клиента? --> req.getHeader('agent')
},
// Опции
{
    timestamps: { createdAt: 'created', updatedAt: false },
    // in base 2 (binary): 50MB = 1024 * 1024 * 50 bytes
    // in base 10 (SI): 50MB = 1000 * 1000 * 50 bytes
    capped:     { size: 1024 * 1024 * 50, max: 50000 },
});

// Компилируем модель для лог-документа (мангус добавит
// окончание s к названию коллекции в БД -> logs)
const logModel = mongoose.model('log', logSchema);

export { logModel };
