import { ClassModel } from '../models';
import {pushLessonToClass} from "../routers/classes/education";

export class Class {
    constructor(data) { // data <- req.body or {}
        this.model = {
            // Присваиваем полю экземпляр класса модели
            class: new ClassModel(data),
        };
    }

    create() {
        return this.model.class.create();
    }

    // GET /classes
    getClasses() {
        return this.model.class.getClasses();
    }

    // GET /classes/:classHash
    getClass(hash) {
        return this.model.class.getClass(hash);
    }

    // PUT /classes/:classHash
    updateClass(hash) {
        return this.model.class.updateClass(hash);
    }

    // DELETE /classes/:classHash
    deleteClass(hash) {
        return this.model.class.deleteClass(hash);
    }

    // POST /classes/:classHash/enroll - зачислить студента на поток
    enrollToClass(hash) {
        return this.model.class.enrollToClass(hash);
    }

    // POST /classes/:classHash/expel - отчислить студента с потока
    expelFromClass(hash) {
        return this.model.class.expelFromClass(hash);
    }

    // POST /classes/:classHash/lesson - добавить урок в программу класса
    pushLessonToClass(hash) {
        return this.model.class.pushLessonToClass(hash);
    }
}
