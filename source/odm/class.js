// ODM - Object Document Mapper
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { lessonModel, userModel } from '../odm';

const classSchema = new mongoose.Schema({
    title:       { type: String, maxlength: 30 },
    description: { type: String, maxlength: 250 },
    hash:        {
        type:     String,
        required: true,
        unique:   true,
        default:  () => uuidv4(),
    },
    students: [
        {
            _id:      false, // Не добавлять автополе _id
            // В свойство user должно быть записано значение _id
            // user-документа из коллекции users БД. При необходимости
            // на элементе массива students можно будет вызвать метод
            // populate('user'), чтобы мангус присвоил свойству user
            // полноценный user-документ из коллекции users БД
            user:     { type: mongoose.SchemaTypes.ObjectId, ref: 'user' },
            status:   String,
            expelled: Boolean,
            notes:    { type: String, maxlength: 250 },
        },
    ],
    lessons: [
        {
            _id:       false,
            // В свойство lesson должно быть записано значение _id
            // lesson-документа из коллекции lessons БД. При необходимости
            // на элементе массива lessons можно будет вызвать метод
            // populate('lesson'), чтобы мангус присвоил свойству lesson
            // полноценный lesson-документ из коллекции lessons БД
            lesson:    { type: mongoose.SchemaTypes.ObjectId, ref: 'lesson' },
            scheduled: Date,
        },
    ],
    duration: {
        type: {
            started: Date,
            closed:  Date,
        },
    },
    order: { type: Number, min: 0, index: true },
    tag:   String,
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' } });

classSchema.index({ title: 'text', description: 'text' });

classSchema.path('duration').validate(function (value) {
    // Если задается только одно поле, то проверять нечего
    if (!value.started || !value.closed) {
        return true;
    }

    return value.started < value.closed;
}, 'Class start date must be less then close date');
// Для схемы - duration: { started: Date, closed:  Date } - мангус кидает
// ошибку - TypeError: Cannot read property 'validate' of undefined

// Перед сохранением в БД. Срабатывает на методах класса ClassModel:
// create(), enrollToClass(), expelFromClass(), pushLessonToClass()
classSchema.pre('save', async function (next) {
    // Проверка нужна только для метода create(), остальные
    // методы все проверки выполняют внутри себя
    if (this.tag !== 'create') {
        return next();
    }
    let errMsg = '';
    let arr = this.students;
    // Проверяем валидность user-полей в объектах массива students
    // (наличие соответствующих _id в коллекции users)
    for (let i = 0; i < arr.length; i++) {
        const collUser = await userModel.findOne(arr[ i ].user)
            .select('_id')
            .lean();
        // Если юзер в коллекции users не найден -> collUser === null
        if (!collUser) {
            errMsg = `User id ${arr[ i ].user} not found in users collection`;
            break;
        }
    }
    if (errMsg) {
        return next(new Error(errMsg));
    }

    arr = this.lessons;
    for (let i = 0; i < arr.length; i++) {
        const collLesson = await lessonModel.findOne(arr[ i ].lesson)
            .select('_id')
            .lean();
        // Если урок в коллекции lessons не найден -> collLesson === null
        if (!collLesson) {
            errMsg = `Lesson id ${arr[ i ].lesson} not found in lessons collection`;
            break;
        }
    }
    if (errMsg) {
        return next(new Error(errMsg));
    }
    next();
});

// Мангус добавит окончание s к названию коллекции в БД
const classModel = mongoose.model('class', classSchema);

export { classModel };
