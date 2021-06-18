// ODM - Object Document Mapper
import mongoose from 'mongoose';
import { userModel } from '../odm';

import { urlValidator } from '../utils/urlValidator.js';

// Дочерняя (к user) модель student
const studentModel = userModel.discriminator('student', new mongoose.Schema({
    roles: [
        {
            type: String,
            enum: {
                values:  [ 'newbie', 'student' ],
                message: 'You should write - newbie or student',
            },
        },
    ],
    social: {
        facebook: { type: String, trim: true, validate: [ urlValidator, 'Invalid URL' ] },
        linkedin: { type: String, trim: true, validate: [ urlValidator, 'Invalid URL' ] },
        github:   { type: String, trim: true, validate: [ urlValidator, 'Invalid URL' ] },
        skype:    { type: String, trim: true, validate: [ urlValidator, 'Invalid URL' ] },
        telegram: { type: String, trim: true, validate: [ urlValidator, 'Invalid URL' ] },
    },
    notes: { type: String, maxlength: 250 },
}));

export { studentModel };
