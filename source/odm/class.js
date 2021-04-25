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
    order:    { type: Number, index: true },
    created:  Date,
    modified: Date,
});

classSchema.index({ title: 'text', description: 'text' });

// Мангус добавит окончание s к названию коллекции в БД
const classModel = mongoose.model('class', classSchema);

export { classModel };
