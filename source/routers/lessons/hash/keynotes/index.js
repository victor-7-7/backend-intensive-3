import dg from 'debug';
import { Lesson } from '../../../../controllers';

const debug = dg('router:lessons:keynotes');

// POST lessons/:lessonHash/keynotes
export const addKeynote = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // В req.body должен быть keynote-объект, удовлетворяющий
        // lessonSchema. Такого вида:
        // {
        //   "title": "Node.js introduction",
        //   "order": 1,
        //   "uri": "https://lectrum.io/keynotes/lesson-1"
        // }
        const lesson = new Lesson(req.body);
        const result = await lesson.addKeynoteToLesson(req.params.lessonHash);
        // Если урок с таким хэшем не найден в базе, то result == null
        if (!result) {
            return res.status(404).json({message: 'Lesson not found'});
        }
        // result - объект, содержащий свойство content, являющееся объектом,
        // содержащим свойство keynotes в виде массива с объектами,
        // описывающими заметки
        const notes = result.content.keynotes;
        const keynoteHash = notes[ notes.length - 1 ].hash;
        // Возвращаем клиенту хэш добавленной заметки
        res.status(200).json({ keynoteHash });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Вид объекта result:
// {
//     "content": {
//         "keynotes": [
//             {
//                 "_id": "60ab4e8361bfde0b285d1190",
//                 "title": "Node.js architecture",
//                 "order": 1,
//                 "uri": "https://lectrum.io/keynotes/lesson-1",
//                 "hash": "b3740397-c929-4550-b919-e62930f2fc0b"
//             },
//             {
//                 "_id": "60ab50ee61bfde0b285d1193",
//                 "title": "Node.js architecture-5",
//                 "order": 5,
//                 "uri": "https://lectrum.io/keynotes/lesson-1",
//                 "hash": "b3ecab2a-1e2f-4211-9788-1384054cf942"
//             }
//         ]
//     },
//     "_id": "60ab4e8361bfde0b285d118f"
// }
