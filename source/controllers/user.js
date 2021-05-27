
import { UserModel } from '../models';

export class User {
    constructor(data) { // data <- req.body или {}
        this.model = {
            // Присваиваем полю user экземпляр класса UserModel
            user: new UserModel(data),
        };
    }

    // POST /users
    async create() {
        const result = await this.model.user.create();

        return result;
    }

    // GET /users
    async getUsers() {
        const result = await this.model.user.getUsers();

        return result;
    }

    // GET /users/:userHash
    async getUser(hash) {
        const result = await this.model.user.getUser(hash);

        return result;
    }

    // PUT /users/:userHash
    async updateUser(hash) {
        const result = await this.model.user.updateUser(hash);

        return result;
    }

    // DELETE /users/:userHash
    async deleteUser(hash) {
        const result = await this.model.user.deleteUser(hash);

        return result;
    }
}
