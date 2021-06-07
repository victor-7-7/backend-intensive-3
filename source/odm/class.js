// ODM - Object Document Mapper
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

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
        started: Date,
        closed:  Date,
    },
    order: { type: Number, min: 0, index: true },
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' } });

classSchema.index({ title: 'text', description: 'text' });

classSchema.path('duration').validate(function (value) {
    return value.started < value.closed;
}, 'Class start date must be less then close date');

// Мангус добавит окончание s к названию коллекции в БД
const classModel = mongoose.model('class', classSchema);

export { classModel };
