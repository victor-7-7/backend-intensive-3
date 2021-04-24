
import { ClassModel } from '../models';

export class Class {
    constructor(data) { // data <- req.body
        this.model = {
            // Присваиваем полю экземпляр класса модели
            class: new ClassModel(data),
        };
    }

    async create() {
        const result = await this.model.class.create();

        return result;
    }
}
