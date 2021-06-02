import dg from 'debug';
import { Class } from '../../../controllers';

const debug = dg('router:classes:education');

// POST classes/:classHash/enroll
export const enroll = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // В req.body должен быть student-объект вида:
        // {
        //   "user": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        //   "status": "select",
        //   "notes": "отличный студент"
        // }
        const group = new Class(req.body);
        const result = await group.enrollToClass(req.params.classHash);
        // Если класс с таким хэшем не найден в базе, то result == null
        if (result === null) {
            return  res.status(404).json({message: 'Class not found'});
        }
        // Если user с хэшем req.body.user не найден в коллекции users БД,
        // то result == 0
        if (result === 0) {
            return  res.status(404).json({message: 'User not found'});
        }
        res.status(200).json({message: 'Студент зачислен на поток'});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// POST classes/:classHash/expel
export const expel = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // В req.body должен быть объект вида:
        // {
        //   "user": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        // }
        const group = new Class(req.body);
        const result = await group.expelFromClass(req.params.classHash);
        // Если класс с таким хэшем не найден в базе, то result == null
        if (result === null) {
            return  res.status(404).json({ message: 'Class not found' });
        }
        // Если user с хэшем req.body.user не найден в коллекции users БД,
        // то result == 0
        if (result === 0) {
            return  res.status(404).json({ message: 'User not found' });
        }
        // Если студент не был записан на данный курс, то result == -1
        if (result === -1) {
            return  res.status(404).json({
                message: 'The student was not enrolled in the course',
            });
        }
        res.status(200).json({message: 'Студент отчислен'});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
