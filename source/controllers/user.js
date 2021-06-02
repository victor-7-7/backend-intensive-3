import { UserModel } from '../models';

export class User {
    constructor(data) { // data <- req.body или {}
        this.model = {
            // Присваиваем полю user экземпляр класса UserModel
            user: new UserModel(data),
        };
    }

    // POST /users
    create() {
        return this.model.user.create();
    }

    // GET /users
    getUsers() {
        return this.model.user.getUsers();
    }

    // GET /users/:userHash
    getUser(hash) {
        return this.model.user.getUser(hash);
    }

    // PUT /users/:userHash
    updateUser(hash) {
        return this.model.user.updateUser(hash);
    }

    // DELETE /users/:userHash
    deleteUser(hash) {
        return this.model.user.deleteUser(hash);
    }
}
