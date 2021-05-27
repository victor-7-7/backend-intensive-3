// ODM - Object Document Mapper
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const classSchema = new mongoose.Schema({
    title:       String,
    description: String,
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
            user:     { type: mongoose.ObjectId, ref: 'user' },
            status:   String,
            expelled: Boolean,
            notes:    String,
        },
    ],
    lessons: [
        {
            // В свойство lesson должно быть записано значение _id
            // lesson-документа из коллекции lessons БД. При необходимости
            // на элементе массива lessons можно будет вызвать метод
            // populate('lesson'), чтобы мангус присвоил свойству lesson
            // полноценный lesson-документ из коллекции lessons БД
            lesson:    { type: mongoose.ObjectId, ref: 'lesson' },
            scheduled: Date,
        },
    ],
    duration: {
        started: Date,
        closed:  Date,
    },
    order: { type: Number, index: true },
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' } });

classSchema.index({ title: 'text', description: 'text' });

// Мангус добавит окончание s к названию коллекции в БД
const classModel = mongoose.model('class', classSchema);

export { classModel };
