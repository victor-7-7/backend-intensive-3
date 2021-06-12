// ODM - Object Document Mapper
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { urlValidator } from '../utils/urlValidator';

const videoOrKeynoteSchema = new mongoose.Schema({
    hash: {
        type:     String,
        required: true,
        unique:   true,
        default:  () => uuidv4(),
    },
    title: { type: String, maxlength: 30 },
    order: { type: Number, min: 0 },
    uri:   {
        type:     String,
        trim:     true,
        validate: [ urlValidator, 'Invalid URL' ],
    },
}, { _id: false }); // Не добавлять автополе _id в video/keynote-объект


const lessonSchema = new mongoose.Schema({
    title:       { type: String, maxlength: 30 },
    description: { type: String, maxlength: 250 },
    order:       { type: Number, min: 0, index: true },
    hash:        {
        type:     String,
        required: true,
        unique:   true,
        default:  () => uuidv4(),
    },
    availability: [ String ],
    content:      {
        videos:   [ videoOrKeynoteSchema ],
        keynotes: [ videoOrKeynoteSchema ],
    },
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' } });

// Мангус добавит окончание s к названию коллекции в БД
const lessonModel = mongoose.model('lesson', lessonSchema);

export { lessonModel };
