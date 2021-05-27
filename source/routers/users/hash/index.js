import dg from 'debug';
import { User } from '../../../controllers';

const debug = dg('router:users:hash');

// GET /users/:userHash
export const getByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const user = new User({});
        const result = await user.getUser(req.params.userHash);
        // Если юзер с таким хэшем не найден в базе, то result == null
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT /users/:userHash
export const updateByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // В req.body должен быть update-объект, удовлетворяющий
        // userSchema. В нем указаны поля user-объекта, подлежащие
        // обновлению. Не должно быть свойства hash
        const user = new User(req.body);
        const result = await user.updateUser(req.params.userHash);
        // Если юзер с таким хэшем не найден в базе, то result == null
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /users/:userHash
export const removeByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const user = new User({});
        const result = await user.deleteUser(req.params.userHash);
        // Если юзер с таким хэшем не найден в базе, то result == null
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.sendStatus(204); // No Content
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

