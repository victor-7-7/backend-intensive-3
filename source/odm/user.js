// ODM - Object Document Mapper
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Схема для user
const userSchema = new mongoose.Schema({
    hash: {
        type:     String,
        required: true,
        unique:   true,
        default:  () => uuidv4(),
    },
    name: {
        first: { type: String, required: true, minlength: 2, maxlength: 15 },
        last:  { type: String, required: true, minlength: 2, maxlength: 15 },
    },
    dateOfBirth: Date,
    phones:      [
        {
            _id:   false, // Не добавлять автополе _id
            phone: {
                type:     String,
                required: true,
                trim:     true,
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
            _id:   false,
            email: {
                type:      String,
                required:  true,
                trim:      true,
                lowercase: true,
                unique:    true,
                // https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
                // https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
                // https://habr.com/ru/post/175375/
                // Проще послать проверочный код на указанное мыло,
                // чем валидировать его синтаксис
                match:     [
                    // (?:value)? or (?:red|green|blue) <-- non-capturing group. This is
                    // more efficient if you don’t plan to use the group’s contents.
                    /^[\w.!?#$%&^`'*+~={}/|-]+@[A-z0-9](?:[A-z0-9-]{0,61}[A-z0-9])?(?:\.[A-z0-9](?:[A-z0-9-]{0,61}[A-z0-9])?)*$/,
                    /*
                    /.+@.+\..+/i,
                    */
                    'Please set a valid email address',
                ],
            },
            primary: Boolean,
        },
    ],
    password: {
        type:     String,
        required: true,
        select:   false,
    },
    sex: {
        type:     String,
        required: true,
        enum:     {
            values:  [ 'm', 'f' ],
            message: 'You should write - m or f',
        },
    },
    disabled:    Boolean,
    description: String,
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' } });

userSchema.index({ 'name.first': 1, 'name.last': 1 });
// https://stackoverflow.com/questions/24714166/full-text-search-with-weight-in-mongoose
userSchema.index({ notes: 'text' });

// Компилируем модель для user (мангус добавит
// окончание s к названию коллекции в БД -> users)
const userModel = mongoose.model('user', userSchema);

export { userModel };
