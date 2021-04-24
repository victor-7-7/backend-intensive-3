import dg from 'debug';
import { Class } from '../../controllers';

const debug = dg('router:classes');

export const get = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const mockData = [ 'GET /classes' ]; // Следует вернуть массив
        res.status(200).json(mockData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        /*const mockData = 'POST /classes';
        res.status(201).json({ mockData });*/
        const classInst = new Class(req.body);
        const result = await classInst.create();
        res.status(201).json(result); // 201 - Created
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
