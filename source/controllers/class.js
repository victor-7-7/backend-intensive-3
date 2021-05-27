
import { ClassModel } from '../models';

export class Class {
    constructor(data) { // data <- req.body or {}
        this.model = {
            // Присваиваем полю экземпляр класса модели
            class: new ClassModel(data),
        };
    }

    async create() {
        const result = await this.model.class.create();

        return result;
    }

    // GET /classes
    async getClasses() {
        const result = await this.model.class.getClasses();

        return result;
    }

    // GET /classes/:classHash
    async getClass(hash) {
        const result = await this.model.class.getClass(hash);

        return result;
    }

    // PUT /classes/:classHash
    async updateClass(hash) {
        const result = await this.model.class.updateClass(hash);

        return result;
    }

    // DELETE /classes/:classHash
    async deleteClass(hash) {
        const result = await this.model.class.deleteClass(hash);

        return result;
    }

    // POST /classes/:classHash/enroll - зачислить студента на поток
    async enrollToClass(hash) {
        const result = await this.model.class.enrollToClass(hash);

        return result;
    }

    // POST /classes/:classHash/expel - отчислить студента с потока
    async expelFromClass(hash) {
        const result = await this.model.class.expelFromClass(hash);

        return result;
    }
}
