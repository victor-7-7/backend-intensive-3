// ODM - Object Document Mapper
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { classPreSave } from './classPreSavePlugin';

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
            _id:    false, // Не добавлять автополе _id
            // В свойство user должно быть записано значение _id
            // student-документа из коллекции users БД. При необходимости
            // на элементе массива students можно будет вызвать метод
            // populate('user'), чтобы мангус присвоил свойству user
            // полноценный student-документ из коллекции users БД
            user:   { type: mongoose.SchemaTypes.ObjectId, ref: 'student' },
            status: {
                type: String,
                enum: [ 'standard', 'select', 'premium' ],
            },
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

// Для схемы - duration: { started: Date, closed:  Date } - мангус кидает
// ошибку - TypeError: Cannot read property 'validate' of undefined
classSchema.path('duration').validate(function (value) {
    // Если задается только одно поле, то проверять нечего
    if (!value.started || !value.closed) {
        return true;
    }

    return value.started < value.closed;
}, 'Class start date must be less then close date');

classSchema.plugin(classPreSave);

// Мангус добавит окончание s к названию коллекции в БД
const classModel = mongoose.model('class', classSchema);

export { classModel };
