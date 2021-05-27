
import { LessonModel } from '../models';

export class Lesson {
    constructor(data) { // data <- req.body or {}
        this.model = {
            // Присваиваем полю экземпляр класса модели
            lesson: new LessonModel(data),
        };
    }

    // POST /lessons
    async create() {
        const result = await this.model.lesson.create();

        return result;
    }

    // GET /lessons
    async getLessons() {
        const result = await this.model.lesson.getLessons();

        return result;
    }

    // GET /lessons/:lessonHash
    async getLesson(hash) {
        const result = await this.model.lesson.getLesson(hash);

        return result;
    }

    // PUT /lessons/:lessonHash
    async updateLesson(hash) {
        const result = await this.model.lesson.updateLesson(hash);

        return result;
    }

    // DELETE /lessons/:lessonHash
    async deleteLesson(hash) {
        const result = await this.model.lesson.deleteLesson(hash);

        return result;
    }

    // POST lessons/:lessonHash/videos
    async addVideoToLesson(hash) {
        const result = await this.model.lesson.addVideoToLesson(hash);

        return result;
    }

    // GET /lessons/:lessonHash/videos/:videoHash
    async getVideoByHash(lessonHash, videoHash) {
        const result = await this.model.lesson.getVideoByHash(lessonHash, videoHash);

        return result;
    }

    // DELETE /lessons/:lessonHash/videos/:videoHash
    async removeVideoByHash(lessonHash, videoHash) {
        const result = await this.model.lesson.removeVideoByHash(lessonHash, videoHash);

        return result;
    }

    // POST lessons/:lessonHash/keynotes
    async addKeynoteToLesson(hash) {
        const result = await this.model.lesson.addKeynoteToLesson(hash);

        return result;
    }

    // GET /lessons/:lessonHash/keynotes/:keynoteHash
    async getKeynoteByHash(lessonHash, keynoteHash) {
        const result = await this.model.lesson.getKeynoteByHash(lessonHash, keynoteHash);

        return result;
    }

    // DELETE /lessons/:lessonHash/keynotes/:keynoteHash
    async removeKeynoteByHash(lessonHash, keynoteHash) {
        const result = await this.model.lesson.removeKeynoteByHash(lessonHash, keynoteHash);

        return result;
    }
}
