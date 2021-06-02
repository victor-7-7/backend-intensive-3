import { LessonModel } from '../models';

export class Lesson {
    constructor(data) { // data <- req.body or {}
        this.model = {
            // Присваиваем полю экземпляр класса модели
            lesson: new LessonModel(data),
        };
    }

    // POST /lessons
    create() {
        return this.model.lesson.create();
    }

    // GET /lessons
    getLessons() {
        return this.model.lesson.getLessons();
    }

    // GET /lessons/:lessonHash
    getLesson(hash) {
        return this.model.lesson.getLesson(hash);
    }

    // PUT /lessons/:lessonHash
    updateLesson(hash) {
        return this.model.lesson.updateLesson(hash);
    }

    // DELETE /lessons/:lessonHash
    deleteLesson(hash) {
        return this.model.lesson.deleteLesson(hash);
    }

    // POST lessons/:lessonHash/videos
    addVideoToLesson(hash) {
        return this.model.lesson.addVideoToLesson(hash);
    }

    // GET /lessons/:lessonHash/videos/:videoHash
    getVideoByHash(lessonHash, videoHash) {
        return this.model.lesson.getVideoByHash(lessonHash, videoHash);
    }

    // DELETE /lessons/:lessonHash/videos/:videoHash
    removeVideoByHash(lessonHash, videoHash) {
        return this.model.lesson.removeVideoByHash(lessonHash, videoHash);
    }

    // POST lessons/:lessonHash/keynotes
    addKeynoteToLesson(hash) {
        return this.model.lesson.addKeynoteToLesson(hash);
    }

    // GET /lessons/:lessonHash/keynotes/:keynoteHash
    getKeynoteByHash(lessonHash, keynoteHash) {
        return this.model.lesson.getKeynoteByHash(lessonHash, keynoteHash);
    }

    // DELETE /lessons/:lessonHash/keynotes/:keynoteHash
    removeKeynoteByHash(lessonHash, keynoteHash) {
        return this.model.lesson.removeKeynoteByHash(lessonHash, keynoteHash);
    }
}
