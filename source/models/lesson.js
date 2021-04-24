
import { lessonModel } from '../odm';

export class LessonModel {
    constructor(data) {
        this.data = data;
    }

    async create() {
        // Сохраняем документ this.data в соотв коллекцию БД
        const result = await lessonModel.create(this.data);

        return result;
    }
}

