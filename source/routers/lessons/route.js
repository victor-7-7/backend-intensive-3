import dg from 'debug';
import { Lesson } from '../../controllers';

const debug = dg('router:lessons');

export const get = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const mockData = [ 'GET /lessons' ]; // Следует вернуть массив
        res.status(200).json(mockData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        /*const mockData = 'POST /lessons';
        res.status(201).json({ mockData });*/
        const lesson = new Lesson(req.body);
        const result = await lesson.create();
        res.status(201).json(result); // 201 - Created
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
