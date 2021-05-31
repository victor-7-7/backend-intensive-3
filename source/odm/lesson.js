// ODM - Object Document Mapper
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const lessonSchema = new mongoose.Schema({
    title:       String,
    description: String,
    order:       { type: Number, index: true },
    hash:        {
        type:     String,
        required: true,
        unique:   true,
        default:  () => uuidv4(),
    },
    availability: [ String ],
    content:      {
        videos: [
            {
                hash: {
                    type:     String,
                    required: true,
                    unique:   true,
                    default:  () => uuidv4(),
                },
                title: String,
                order: Number,
                uri:   String,
            }, { _id: false }, // Не добавлять автополе _id в video-объект
        ],
        keynotes: [
            {
                hash: {
                    type:     String,
                    required: true,
                    unique:   true,
                    default:  () => uuidv4(),
                },
                title: String,
                order: Number,
                uri:   String,
            }, { _id: false }, // Не добавлять автополе _id в keynote-объект
        ],
    },
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' } });

// Мангус добавит окончание s к названию коллекции в БД
const lessonModel = mongoose.model('lesson', lessonSchema);

export { lessonModel };
