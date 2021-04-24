// ODM - Object Document Mapper
import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
    title:       String,
    description: String,
    hash:        String,
    students:    [
        {
            user:     mongoose.ObjectId,
            status:   String,
            expelled: Boolean,
            notes:    String,
        },
    ],
    lessons: [
        {
            lesson:    mongoose.ObjectId,
            scheduled: Date,
        },
    ],
    duration: {
        started: Date,
        closed:  Date,
    },
    order:    Number,
    created:  Date,
    modified: Date,
});

// Мангус добавит окончание s к названию коллекции в БД
const classModel = mongoose.model('class', classSchema);

export { classModel };
