import dg from 'debug';
import { Class } from '../../controllers';

const debug = dg('router:classes');

// GET /classes
export const get = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const group  = new Class({});
        // Если коллекция пустая, то result == []
        const result = await group.getClasses();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// POST /classes
export const post = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // В req.body должен быть class-объект, удовлетворяющий classSchema
        // (свойство hash отсутствует)
        const group = new Class(req.body);
        const result = await group.create();
        res.status(201).json(result); // 201 - Created
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
