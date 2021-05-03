
import { logModel } from '../odm';

export class LogModel {
    constructor(data) {
        this.data = data;
    }

    async create() {
        // Сохраняем документ this.data в коллекцию logs БД
        const result = await logModel.create(this.data);

        return result;
    }
}

