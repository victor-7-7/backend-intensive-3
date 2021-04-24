
import { userModel } from '../odm';

export class UserModel {
    constructor(data) {
        this.data = data;
    }

    async create() {
        // Сохраняем документ this.data в коллекцию users БД
        const result = await userModel.create(this.data);

        return result;
    }
}

