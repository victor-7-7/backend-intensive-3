
import { classModel } from '../odm';

export class ClassModel {
    constructor(data) {
        this.data = data;
    }

    async create() {
        // Сохраняем документ this.data в соотв коллекцию БД
        const result = await classModel.create(this.data);

        return result;
    }
}

