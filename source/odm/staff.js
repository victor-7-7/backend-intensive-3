// ODM - Object Document Mapper
import mongoose from 'mongoose';
import { userModel } from '../odm';

// Дочерняя (к user) модель staff
const staffModel = userModel.discriminator('staff', new mongoose.Schema({
    roles: [
        {
            type: String,
            enum: {
                values:  [ 'admin', 'teacher', 'mentor' ],
                message: 'You should write - admin or teacher or mentor',
            },
        },
    ],
    image:   String,
    classes: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref:  'class',
        },
    ],
    started: Date,
}));

export { staffModel };
