
import { LessonModel } from '../models';

export class Lesson {
    constructor(data) { // data <- req.body
        this.model = {
            // Присваиваем полю экземпляр класса модели
            lesson: new LessonModel(data),
        };
    }

    async create() {
        const result = await this.model.lesson.create();

        return result;
    }
}
