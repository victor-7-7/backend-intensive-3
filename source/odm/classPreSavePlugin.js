
import { lessonModel, studentModel } from './index';

export function classPreSave(schema) {
    // Перед сохранением в БД. Срабатывает на методах класса ClassModel:
    // create(), enrollToClass(), expelFromClass(), pushLessonToClass()
    schema.pre('save', async function (next) {
        // Проверка нужна только для метода create(), остальные
        // методы все проверки выполняют внутри себя
        if (this.tag !== 'create') {
            return next();
        }
        let errMsg = '';
        let arr = this.students;
        // Проверяем валидность user-полей в объектах массива students
        // (наличие соответствующих _id в подмножестве student коллекции users)
        for (let i = 0; i < arr.length; i++) {
            const collStudent = await studentModel.findById(arr[ i ].user)
                .select('_id')
                .lean();
            // Если студент в коллекции users не найден -> collUser === null
            if (!collStudent) {
                errMsg = `Student id ${arr[ i ].user} not found in users collection`;
                break;
            }
        }
        if (errMsg) {
            return next(new Error(errMsg));
        }

        arr = this.lessons;
        for (let i = 0; i < arr.length; i++) {
            const collLesson = await lessonModel.findOne(arr[ i ].lesson)
                .select('_id')
                .lean();
            // Если урок в коллекции lessons не найден -> collLesson === null
            if (!collLesson) {
                errMsg = `Lesson id ${arr[ i ].lesson} not found in lessons collection`;
                break;
            }
        }
        if (errMsg) {
            return next(new Error(errMsg));
        }
        next();
    });
}

