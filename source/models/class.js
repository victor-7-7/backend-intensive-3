import { classModel, userModel } from '../odm';

export class ClassModel {
    constructor(data) { // data <- req.body or {}
        this.data = data;
    }

    // POST /classes
    create() {
        // Сохраняем документ this.data в соотв коллекцию БД.
        // Мангус автоматически задаст uuid для свойства hash документа
        return classModel.create(this.data);
    }

    // GET /classes
    getClasses() {
        // Получаем из БД массив доков коллекции
        return classModel.find({}, '-_id -__v', { limit: 10 })
            .populate({ path: 'students.user', select: '-_id -__v'})
            .populate({ path: 'lessons.lesson', select: '-_id -__v'});
    }

    // GET /classes/:classHash
    getClass(hash) {
        // Извлекаем док из коллекции по полю hash.
        // Если метод findOne не нашел требуемый док, то он
        // вернет - null
        return classModel.findOne({ hash: hash }, '-_id -__v')
            .populate({ path: 'students.user', select: '-_id -__v'})
            .populate({ path: 'lessons.lesson', select: '-_id -__v'});
    }

    // PUT /classes/:classHash
    updateClass(hash) {
        // В коллекции ищется док по полю hash и обновляются
        // какие-то из его полей в соответствии с this.data.
        // Если метод findOneAndUpdate не нашел требуемый док,
        // то он вернет - null
        return classModel.findOneAndUpdate({ hash: hash }, this.data, { new: true });
    }

    // DELETE /classes/:classHash
    deleteClass(hash) {
        // В коллекции ищется док по полю hash и удаляется. Если метод
        // не нашел требуемый док, то он вернет - null. Если док был
        // найден, то метод вернет его (после удаления из базы)
        return classModel.findOneAndDelete({ hash: hash });
    }

    // POST /classes/:classHash/enroll - зачислить студента на поток
    async enrollToClass(hash) {
        // Mongoose document
        const doc = await classModel.findOne({ hash: hash });
        // Если класс не найден -> doc === null
        if (!doc) {
            return null;
        }
        // https://lab.lectrum.io/school/docs/#/Education/post_classes__classHash__enroll
        // this.data <-- req.body <-- объект вида:
        // {
        //   "user": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        //   "status": "select",
        //   "notes": "отличный студент"
        // }
        const collUser = await userModel.findOne({ hash: this.data.user });
        // Если юзер в коллекции users не найден -> collUser === null
        if (!collUser) {
            return 0;
        }
        // .id <-- мангусовский virtual getter, collUser.id - строка hex-символов
        // student.user - объект типа ObjectId, поэтому требуется toString()
        const student = doc.students.find((student) => student.user.toString() === collUser.id);
        // Если студент в массиве students не будет найден, то student === undefined
        if (student) {
            // Такой студент уже есть в массиве students, снимаем
            // флаг отчисления expelled, студент зачислен на курс
            student.expelled = false;
        } else {
            // Студент в массиве students отсутствует
            const newStudent = {
                user:     collUser._id,
                status:   this.data.status,
                expelled: false,
                notes:    this.data.notes,
            };
            doc.students.push(newStudent);
        }

        return doc.save();
    }

    // POST /classes/:classHash/expel - отчислить студента с потока
    async expelFromClass(hash) {
        // Mongoose document
        const doc = await classModel.findOne({ hash: hash });
        // Если класс не найден -> doc === null
        if (!doc) {
            return null;
        }
        // https://lab.lectrum.io/school/docs/#/Education/post_classes__classHash__expel
        // this.data <-- req.body <-- объект вида:
        // {
        //   "user": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        // }
        const collUser = await userModel.findOne({ hash: this.data.user });
        // Если юзер в коллекции users не найден -> collUser === null
        if (!collUser) {
            return 0;
        }
        // .id <-- мангусовский virtual getter, collUser.id - строка hex-символов
        // student.user - объект типа ObjectId, поэтому требуется toString()
        const student = doc.students.find((student) => student.user.toString() === collUser.id);
        // Если студент в массиве students не будет найден, то student === undefined
        if (!student) {
            // Студент в массиве students отсутствует
            return -1;
        }
        // Студент в массиве students присутствует, поднимаем
        // флаг отчисления expelled, студент отчислен с курса
        student.expelled = true;

        return doc.save();
    }
}

