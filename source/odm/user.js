// ODM - Object Document Mapper
import mongoose from 'mongoose';

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
            email:   String,
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
    notes:    String,
    hash:     String,
    disabled: Boolean,
    created:  Date,
    modified: Date,
});
// Компилируем модель для user (мангус добавит
// окончание s к названию коллекции в БД -> users)
const userModel = mongoose.model('user', userSchema);

export { userModel };
