
import { UserModel } from '../models';

export class User {
    constructor(data) { // data <- req.body
        this.model = {
            // Присваиваем полю экземпляр класса модели
            user: new UserModel(data),
        };
    }

    async create() {
        const result = await this.model.user.create();

        return result;
    }
}
