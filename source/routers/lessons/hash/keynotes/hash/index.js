import dg from 'debug';
import { Lesson } from '../../../../../controllers';

const debug = dg('router:lessons:keynotes:hash');

// GET /lessons/:lessonHash/keynotes/:keynoteHash
export const getKeynoteByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const lesson = new Lesson({});
        const { lessonHash, keynoteHash } = req.params;
        const keynote = await lesson.getKeynoteByHash(lessonHash, keynoteHash);
        // Если урок с хэшем lessonHash не найден в базе, то keynote = 0
        if (keynote === 0) {
            return  res.status(404).json({ message: 'Lesson not found' });
        }
        // Если заметка с хэшем keynoteoHash не найдена в массиве content.keynotes
        // урока, то keynote = -1
        if (keynote === -1) {
            return  res.status(404).json({ message: 'Keynote not found' });
        }
        res.status(200).json(keynote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /lessons/:lessonHash/keynotes/:keynoteHash
export const removeKeynoteByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const lesson = new Lesson({});
        const { lessonHash, keynoteHash } = req.params;
        const result = await lesson.removeKeynoteByHash(lessonHash, keynoteHash);
        // Если урок с хэшем lessonHash не найден в базе, то result = 0
        if (result === 0) {
            return  res.status(404).json({ message: 'Lesson not found' });
        }
        // Если заметка с хэшем keynoteHash не найдена в массиве content.keynotes
        // урока, то result = -1
        if (result === -1) {
            return  res.status(404).json({ message: 'Keynote not found' });
        }
        res.status(200).json({ message: 'Keynote has been removed' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
