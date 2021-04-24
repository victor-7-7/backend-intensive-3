import dg from 'debug';
import { User } from '../../controllers';

const debug = dg('router:users');

export const get = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const mockData = [ 'GET /users' ]; // Следует вернуть массив
        res.status(200).json(mockData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        /*const mockData = 'POST /users';
        res.status(201).json({ mockData });*/
        const user = new User(req.body);
        const result = await user.create();
        res.status(201).json(result); // 201 - Created
        // Клиент получит в ответ:
        /*{
             "_id": "608299794f4dfd27c4a4cad7",
             "name": "John3",
             "email": "some3@email.com",
             "__v": 0
         }*/
        // Для варианта .json({ result }) клиент получит:
        /*{
             "result": {
                 "_id": "60829857b942825be8127c77",
                 "name": "John2",
                 "email": "some2@email.com",
                 "__v": 0
             }
         }*/
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
