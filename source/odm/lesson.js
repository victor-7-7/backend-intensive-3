// ODM - Object Document Mapper
import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
    title:        String,
    description:  String,
    order:        Number,
    hash:         String,
    availability: [ String ],
    content:      {
        videos: [
            {
                hash:  String,
                title: String,
                order: Number,
                uri:   String,
            },
        ],
        keynotes: [
            {
                hash:  String,
                title: String,
                order: Number,
                uri:   String,
            },
        ],
    },
    created:  Date,
    modified: Date,
});

// Мангус добавит окончание s к названию коллекции в БД
const lessonModel = mongoose.model('lesson', lessonSchema);

export { lessonModel };
