import dg from 'debug';
import { Lesson } from '../../../controllers';

const debug = dg('router:lessons:hash');

// GET /lessons/:lessonHash
export const getByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const lesson = new Lesson({});
        const result = await lesson.getLesson(req.params.lessonHash);
        // Если урок с таким хэшем не найден в базе, то result == null
        if (!result) {
            return res.status(404).json({message: 'Lesson not found'});
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT /lessons/:lessonHash
export const updateByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // В req.body должен быть update-объект, удовлетворяющий
        // lessonSchema. В нем указаны поля lesson-объекта, подлежащие
        // обновлению. Не должно быть свойства hash
        const lesson = new Lesson(req.body);
        const result = await lesson.updateLesson(req.params.lessonHash);
        // Если урок с таким хэшем не найден в базе, то result == null
        if (!result) {
            return res.status(404).json({message: 'Lesson not found'});
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /lessons/:lessonHash
export const removeByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const lesson = new Lesson({});
        const result = await lesson.deleteLesson(req.params.lessonHash);
        // Если урок с таким хэшем не найден в базе, то result == null
        if (!result) {
            return res.status(404).json({message: 'Lesson not found'});
        }
        res.sendStatus(204); // No Content
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
