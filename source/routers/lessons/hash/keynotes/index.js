import dg from 'debug';

const debug = dg('router:lessons:keynotes');

export const addKeynote = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // todo: add keynote for lesson in db
        const mockData = 'POST lessons/:lessonHash/keynotes';
        res.status(201).json({ mockData }); // Created
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
