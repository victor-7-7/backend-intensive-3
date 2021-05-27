// ODM - Object Document Mapper
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Схема для user
const userSchema = new mongoose.Schema({
    name: {
        first: String, // String is shorthand for {type: String}
        last:  String,
    },
    phones: [
        {
            phone:   String,
            primary: Boolean,
        },
    ],
    emails: [
        {
            email:   { type: String, unique: true },
            primary: Boolean,
        },
    ],
    password: String,
    sex:      String,
    roles:    [ String ],
    social:   {
        facebook: String,
        linkedin: String,
        github:   String,
        skype:    String,
    },
    notes: String,
    hash:  {
        type:     String,
        required: true,
        unique:   true,
        default:  () => uuidv4(),
    },
    disabled: Boolean,
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' } });

userSchema.index({ 'name.first': 1, 'name.last': 1 });
// https://stackoverflow.com/questions/24714166/full-text-search-with-weight-in-mongoose
userSchema.index({ notes: 'text' });

// Компилируем модель для user (мангус добавит
// окончание s к названию коллекции в БД -> users)
const userModel = mongoose.model('user', userSchema);

export { userModel };
