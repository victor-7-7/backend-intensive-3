import dg from 'debug';
import { Lesson } from '../../controllers';

const debug = dg('router:lessons');

// GET /lessons
export const get = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const lesson = new Lesson({});
        // Если коллекция пустая, то result == []
        const result = await lesson.getLessons();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// POST /lessons
export const post = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // В req.body должен быть lesson-объект, удовлетворяющий lessonSchema
        // (свойство hash отсутствует)
        const lesson = new Lesson(req.body);
        const result = await lesson.create();
        res.status(201).json(result); // 201 - Created
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
