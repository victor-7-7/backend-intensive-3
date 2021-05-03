// ODM - Object Document Mapper
import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
    title:        String,
    description:  String,
    order:        { type: Number, index: true },
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
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' } });

// Мангус добавит окончание s к названию коллекции в БД
const lessonModel = mongoose.model('lesson', lessonSchema);

export { lessonModel };
