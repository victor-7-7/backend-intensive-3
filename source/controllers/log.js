
import { LogModel } from '../models';

export class Log {
    constructor(data) { // data <- объект лога согласно схемы
        this.model = {
            // Присваиваем полю экземпляр класса модели
            log: new LogModel(data),
        };
    }

    async create() {
        const result = await this.model.log.create();

        return result;
    }
}
