// ODM - Object Document Mapper
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

function urlValidator(value) {
    const regex = /(ftp|http|https):\/\/(\w+:?\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@\-/]))?/;

    return regex.test(value);
}

// Схема для user
const userSchema = new mongoose.Schema({
    name: {
        first: { type: String, minlength: 2, maxlength: 15 },
        last:  { type: String, minlength: 2, maxlength: 15 },
    },
    phones: [
        {
            phone: {
                type:     String,
                validate: {
                    validator(value) {
                        return /^\d{3}-\d{3}-\d{4}$/.test(value);
                    },
                    // Кастомное сообщение о невалидности поля phone
                    message(props) {
                        const { value } = props;

                        return `Value '${value}' is not valid phone number`;
                    },
                },
            },
            primary: Boolean,
        },
    ],
    emails: [
        {
            email: {
                type:      String,
                trim:      true,
                lowercase: true,
                unique:    true,
                // https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
                // https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
                match:     [
                    /^[\w.+-]+@[A-z0-9-]+\.[A-z0-9.-]+$/,
                    'Please add a valid email address',
                ],
            },
            primary: Boolean,
        },
    ],
    password: String,
    sex:      String,
    roles:    [ String ],
    social:   {
        facebook: { type: String, validate: [ urlValidator, 'Invalid URL' ] },
        linkedin: { type: String, validate: [ urlValidator, 'Invalid URL' ] },
        github:   { type: String, validate: [ urlValidator, 'Invalid URL' ] },
        skype:    { type: String, validate: [ urlValidator, 'Invalid URL' ] },
    },
    notes: { type: String, maxlength: 250 },
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
