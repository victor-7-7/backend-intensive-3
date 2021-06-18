import { userModel, studentModel, staffModel } from '../odm';

export class UserModel {
    constructor(data) { // data <- req.body or {}
        this.data = data;
    }

    // POST /users
    create() {
        // Создаем и сохраняем документ this.data в коллекцию users БД.
        // Мангус автоматически задаст uuid для свойства hash документа
        if (this.data.group === 'student') {
            delete this.data.group;

            return studentModel.create(this.data);
        }
        if (this.data.group === 'staff') {
            delete this.data.group;

            return staffModel.create(this.data);
        }

        // Клиент должен указать к какой группе относится юзер
        throw new Error('You should set \'group\' field with value: student or staff');
    }

    // GET /users
    getUsers() {
        if (this.data.group === 'student') {
            return studentModel.find({});
        }
        if (this.data.group === 'staff') {
            return staffModel.find({});
        }

        // Получаем из БД массив всех доков коллекции users
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

