import dg from 'debug';
import { Class } from '../../../controllers';

const debug = dg('router:classes:hash');

// GET /classes/:classHash
export const getByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const group = new Class({});
        const result = await group.getClass(req.params.classHash);
        // Если класс с таким хэшем не найден в базе, то result == null
        if (!result) {
            return res.status(404).json({message: 'Class not found'});
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT /classes/:classHash
export const updateByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // В req.body должен быть update-объект, удовлетворяющий
        // classSchema. В нем указаны поля class-объекта, подлежащие
        // обновлению. Не должно быть свойства hash
        const group = new Class(req.body);
        const result = await group.updateClass(req.params.classHash);
        // Если класс с таким хэшем не найден в базе, то result == null
        if (!result) {
            return res.status(404).json({message: 'Class not found'});
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /classes/:classHash
export const removeByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const group = new Class({});
        const result = await group.deleteClass(req.params.classHash);
        // Если класс с таким хэшем не найден в базе, то result == null
        if (!result) {
            return res.status(404).json({message: 'Class not found'});
        }
        res.sendStatus(204); // No Content
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
