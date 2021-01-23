import { NotFoundError } from './index.js';

const usersHashes = [ 'abc123', 'cab312', 'bca231' ];
const classesHashes = [ 'abc123', 'cab312', 'bca231' ];
const lessonsHashes = [ 'abc123', 'cab312', 'bca231' ];
const videosHashes = [ 'abc123', 'cab312', 'bca231' ];
const keynotesHashes = [ 'abc123', 'cab312', 'bca231' ];

export const hints = {};
// По дефолту свойства (notLast, couple) объекта hints будут:
// not configurable - нельзя удалить или изменить тип свойства
// not writable - нельзя изменить значение свойства
Object.defineProperty(hints, 'notLast', { value: 1 });
Object.defineProperty(hints, 'couple', { value: 2 });
// Чтобы нельзя было добавить новые свойства к объекту hints
Object.freeze(hints);

export const checkHash = (hint) => (req, res, next) => {
    const arr = req.originalUrl.split('/');

    if (hint === hints.notLast) {
        arr.pop();
    }
    const hash = arr.pop();
    const category = arr.pop();

    /** Если имеем два хэша в пути */
    if (hint === hints.couple) {
        const previousHash = arr.pop();
        const previousCategory = arr.pop();

        // Проверяем первый хэш
        switch (previousCategory) {
            // Два хэша в пути пока имеем только в lessons
            case 'lessons':
                // Если хэш урока невалидный
                if (!lessonsHashes.includes(previousHash)) {
                    throw new NotFoundError(
                        `Lesson by hash ${previousHash} not found`, 404,
                    );
                    // res.status(404).json(`Lesson by hash ${previousHash} not found`);
                    // return;
                }
                break;
            default:
                res.sendStatus(400);
        }

        // Проверяем второй хэш
        switch (category) {
            case 'videos':
                if (videosHashes.includes(hash)) {
                    next();
                } else {
                    throw new NotFoundError(
                        `Video by hash ${hash} not found`, 404,
                    );
                    // res.status(404).json(`Video by hash ${hash} not found`);
                }
                break;
            case 'keynotes':
                if (keynotesHashes.includes(hash)) {
                    next();
                } else {
                    throw new NotFoundError(
                        `Keynote by hash ${hash} not found`, 404,
                    );
                    // res.status(404).json(`Keynote by hash ${hash} not found`);
                }
                break;
            default:
                res.sendStatus(400);
        }
    }

    /** Имеем только один хэш в пути */
    else {
        switch (category) {
            case 'users':
                if (usersHashes.includes(hash)) {
                    next();
                } else {
                    throw new NotFoundError(
                        `User by hash ${hash} not found`, 404,
                    );
                    // res.status(404).json(`User by hash ${hash} not found`);
                }
                break;
            case 'classes':
                if (classesHashes.includes(hash)) {
                    next();
                } else {
                    throw new NotFoundError(
                        `Class by hash ${hash} not found`, 404,
                    );
                    // res.status(404).json(`Class by hash ${hash} not found`);
                }
                break;
            case 'lessons':
                if (lessonsHashes.includes(hash)) {
                    next();
                } else {
                    throw new NotFoundError(
                        `Lesson by hash ${hash} not found`, 404,
                    );
                    // res.status(404).json(`Lesson by hash ${hash} not found`);
                }
                break;
            default:
                res.sendStatus(400);
        }
    }
};
