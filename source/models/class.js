import { classModel, userModel, lessonModel } from '../odm';

export class ClassModel {
    // JS-object req.body <-- [express] app.use(bodyParser.json())
    constructor(data) { // data <- req.body or {}
        this.data = data;
    }

    // POST /classes
    create() {
        // Для использования в classSchema.pre('save', ...) хуке
        this.data.tag = 'create';

        // Создаем и сохраняем class-документ this.data в соотв коллекцию БД.
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
        // Проверяем, что апдейт не касается поля hash и
        // полей-массивов students/lessons. Если такие поля есть,
        // то удаляем их из апдейта.
        const upd = this.data;
        if ('hash' in upd) {
            delete upd.hash;
        }
        if ('students' in upd) {
            delete upd.students;
        }
        if ('lessons' in upd) {
            delete upd.lessons;
        }

        // В БД ищется class-док по полю hash и обновляются
        // какие-то из его полей в соответствии с this.data.
        // Если метод findOneAndUpdate не нашел требуемый док,
        // то он вернет - null
        return classModel.findOneAndUpdate(
            { hash: hash },
            upd,
            { new: true, runValidators: true },
            // runValidators: true - чтобы срабатывали схемные валидаторы
        );
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
        // this.data <-- JS-object req.body <-- объект вида:
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
        // this.data <-- JS-object req.body <-- объект вида:
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

    // POST /classes/:classHash/lesson - добавить урок в программу класса
    async pushLessonToClass(hash) {
        // Mongoose document
        const classDoc = await classModel.findOne({ hash: hash });
        // Если класс не найден -> doc === null
        if (!classDoc) {
            return null;
        }
        // this.data <-- JS-object req.body <-- объект вида (здесь
        // в первом поле не хэш урока, а идентификатор урока):
        // {
        //   "lesson": "60ab4e8361bfde0b285d118f"
        //   "scheduled": "2021-05-24T06:58:11.843Z"
        // }
        const collLesson = await lessonModel.findById(this.data.lesson);
        // Если lesson в коллекции lessons не найден -> collLesson === null
        if (!collLesson) {
            return 0;
        }
        // .id <-- мангусовский virtual getter, collLesson.id - строка hex-символов
        // lsn.lesson - объект типа ObjectId, поэтому требуется toString()
        const lsn = classDoc.lessons.find((lsn) => lsn.lesson.toString() === collLesson.id);
        if (lsn) {
            // Такой урок в массиве lessons уже есть
            return -1;
        }
        classDoc.lessons.push(this.data);

        return classDoc.save();
    }
}
