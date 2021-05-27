import dg from 'debug';
import { Lesson } from '../../../../../controllers';

const debug = dg('router:lessons:videos:hash');

// GET /lessons/:lessonHash/videos/:videoHash
export const getVideoByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const lesson = new Lesson({});
        const { lessonHash, videoHash } = req.params;
        const video = await lesson.getVideoByHash(lessonHash, videoHash);
        // Если урок с хэшем lessonHash не найден в базе, то video = 0
        if (video === 0) {
            return  res.status(404).json({ message: 'Lesson not found' });
        }
        // Если видео с хэшем videoHash не найдено в массиве content.videos
        // урока, то video = -1
        if (video === -1) {
            return  res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /lessons/:lessonHash/videos/:videoHash
export const removeVideoByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const lesson = new Lesson({});
        const { lessonHash, videoHash } = req.params;
        const result = await lesson.removeVideoByHash(lessonHash, videoHash);
        // Если урок с хэшем lessonHash не найден в базе, то result = 0
        if (result === 0) {
            return  res.status(404).json({ message: 'Lesson not found' });
        }
        // Если видео с хэшем videoHash не найдено в массиве content.videos
        // урока, то result = -1
        if (result === -1) {
            return  res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json({ message: 'Video has been removed' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

