import { userModel } from '../odm';

export class UserModel {
    constructor(data) { // data <- req.body or {}
        this.data = data;
    }

    // POST /users
    create() {
        // Создаем и сохраняем user-документ this.data в коллекцию users БД.
        // Мангус автоматически задаст uuid для свойства hash документа
        return userModel.create(this.data);
    }

    // GET /users
    getUsers() {
        // Получаем из БД массив доков коллекции users
        return userModel.find({});
    }

    // GET /users/:userHash
    getUser(hash) {
        // Извлекаем из БД юзер-док по полю hash.
        // Если метод findOne не нашел требуемый док, то он
        // вернет - null
        return userModel.findOne({ hash: hash });
    }

    // https://masteringjs.io/tutorials/mongoose/update
    // PUT /users/:userHash
    updateUser(hash) {
        // Проверяем, что апдейт не касается поля hash Если
        // такое поле есть, то удаляем его из апдейта.
        const upd = this.data;
        if ('hash' in upd) {
            delete upd.hash;
        }

        // В БД ищется юзер-док по полю hash и обновляются
        // какие-то из его полей в соответствии с this.data.
        // Если метод findOneAndUpdate не нашел требуемый док,
        // то он вернет - null
        return userModel.findOneAndUpdate(
            { hash: hash },
            upd,
            { new: true, runValidators: true },
            // runValidators: true - чтобы срабатывали схемные валидаторы
        );
    }

    // DELETE /users/:userHash
    deleteUser(hash) {
        // В БД ищется юзер-док по полю hash и удаляется. Если метод
        // не нашел требуемый док, то он вернет - null. Если док был
        // найден, то метод вернет его (после удаления из базы)
        return userModel.findOneAndDelete({ hash: hash });
    }
}

