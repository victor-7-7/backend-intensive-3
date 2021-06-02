import { lessonModel } from '../odm';

export class LessonModel {
    constructor(data) {
        this.data = data;
    }

    // POST /lessons
    create() {
        // Сохраняем документ this.data в соотв коллекцию БД.
        // Мангус автоматически задаст uuid для свойства hash документа
        return lessonModel.create(this.data);
    }

    // GET /lessons
    getLessons() {
        // Получаем из БД массив доков коллекции
        return lessonModel.find({});
    }

    // GET /lessons/:lessonHash
    getLesson(hash) {
        // Извлекаем док из коллекции по полю hash.
        // Если метод findOne не нашел требуемый док, то он
        // вернет - null
        return lessonModel.findOne({ hash: hash });
    }

    // PUT /lessons/:lessonHash
    updateLesson(hash) {
        // В коллекции ищется док по полю hash и обновляются
        // какие-то из его полей в соответствии с this.data.
        // Если метод findOneAndUpdate не нашел требуемый док,
        // то он вернет - null
        return lessonModel.findOneAndUpdate(
            { hash: hash },
            this.data,
            { new: true },
        );
    }

    // DELETE /lessons/:lessonHash
    deleteLesson(hash) {
        // В коллекции ищется док по полю hash и удаляется. Если метод
        // не нашел требуемый док, то он вернет - null. Если док был
        // найден, то метод вернет его (после удаления из базы)
        return lessonModel.findOneAndDelete({ hash: hash });
    }

    // POST lessons/:lessonHash/videos
    addVideoToLesson(hash) {
        // В коллекции уроков ищется док по полю hash и в массив
        // videos свойства content добавляется элемент, описывающий
        // видео -> this.data:
        // {
        //   "title": "Node.js introduction",
        //   "order": 1,
        //   "uri": "https://lectrum.io/videos/lesson-1"
        // }
        // Если метод findOneAndUpdate не нашел требуемый док,
        // то он вернет - null
        return lessonModel.findOneAndUpdate(
            { hash: hash },
            { $push: { 'content.videos': this.data }},
            { new: true, projection: 'content.videos' },
        );
    }

    // GET /lessons/:lessonHash/videos/:videoHash
    async getVideoByHash(lessonHash, videoHash) {
        // В коллекции уроков ищется док по полю hash: lessonHash,
        // затем в массиве content.videos этого дока ищется элемент
        // по полю hash: videoHash и будет возвращен первый найденный
        // элемент из массива
        const lesson = await lessonModel.findOne({ hash: lessonHash });
        // Если метод findOne не нашел требуемый док, то он
        // вернет -> null
        if (!lesson) {
            return 0;
        }
        const video = lesson.content.videos.find((video) => video.hash === videoHash);
        // Если video в массиве videos не будет найдено, то video === undefined
        if (!video) {
            return -1;
        }

        // {
        //     "_id": "60ad052eea30cb559cbac1fa",
        //     "title": "Node.js architecture5",
        //     "order": 1,
        //     "uri": "https://lectrum.io/videos/lesson-15",
        //     "hash": "84dfc7f7-3d79-47b0-b669-1cd8662d4ad4"
        // }
        return video;
        //--------------------------
        // https://docs.mongodb.com/manual/reference/operator/projection/positional/
        // Вариант, не дающий определить какой из двух хэш-параметров невалиден.
        // Если метод find() ничего не найдет, то просто вернет []
        // return lessonModel.find(
        //     {
        //         hash:                  lessonHash,
        //         'content.videos.hash': videoHash,
        //     }, { 'content.videos.$': 1 },
        // );
        // Если метод lessonModel.find() найдет элемент в массиве,
        // то вернет его в виде:
        // [
        //     {
        //         "content": {
        //             "videos": [
        //                 {
        //                     "_id": "60ad052eea30cb559cbac1fa",
        //                     "title": "Node.js architecture5",
        //                     "order": 1,
        //                     "uri": "https://lectrum.io/videos/lesson-15",
        //                     "hash": "84dfc7f7-3d79-47b0-b669-1cd8662d4ad4"
        //                 }
        //             ]
        //         },
        //         "_id": "60ad052eea30cb559cbac1f9"
        //     }
        // ]
    }

    // DELETE /lessons/:lessonHash/videos/:videoHash
    async removeVideoByHash(lessonHash, videoHash) {
        // В коллекции уроков ищется док по полю hash: lessonHash,
        // затем в массиве content.videos этого дока ищется элемент
        // по полю hash: videoHash и этот элемент удаляется из массива
        const lesson = await lessonModel.findOne({ hash: lessonHash });
        // Если метод findOne не нашел требуемый док, то он
        // вернет -> null
        if (!lesson) {
            return 0;
        }
        const video = lesson.content.videos.find((video) => video.hash === videoHash);
        // Если video в массиве videos не будет найдено, то video === undefined
        if (!video) {
            return -1;
        }
        // Удаляем video-элемент из массива
        lesson.content.videos.splice(lesson.content.videos.indexOf(video), 1);

        return lesson.save();
        //--------------------------
        // https://docs.mongodb.com/manual/reference/operator/update/pull/
        // Вариант, не дающий определить валиден videoHash или нет.
        // Если lessonHash валиден, а videoHash - нет, то ничего из базы
        // удалено не будет, но метод вернет {"n":1,"nModified":1,"ok":1}
        // n: number of documents matched, nModified: number of documents modified
        // Если оба хэша валидны, то видео-элемент будет удален из массива,
        // но мы не будем уверены, что видео удалено
        /*return lessonModel.updateOne(
            { hash: lessonHash },
            { $pull: { 'content.videos': { hash: videoHash } } },
        );*/
    }

    // POST lessons/:lessonHash/keynotes
    addKeynoteToLesson(hash) {
        // В коллекции уроков ищется док по полю hash и в массив
        // keynotes свойства content добавляется элемент, описывающий
        // заметку к уроку -> this.data:
        // {
        //   "title": "Node.js introduction",
        //   "order": 1,
        //   "uri": "https://lectrum.io/keynotes/lesson-1"
        // }
        // Если метод findOneAndUpdate не нашел требуемый док,
        // то он вернет - null
        return lessonModel.findOneAndUpdate(
            { hash: hash },
            { $push: { 'content.keynotes': this.data }},
            { new: true, projection: 'content.keynotes' },
        );
    }

    // GET /lessons/:lessonHash/keynotes/:keynoteHash
    async getKeynoteByHash(lessonHash, keynoteHash) {
        // В коллекции уроков ищется док по полю hash: lessonHash,
        // затем в массиве content.keynotes этого дока ищется элемент
        // по полю hash: keynoteHash и будет возвращен первый найденный
        // элемент из массива
        const lesson = await lessonModel.findOne({ hash: lessonHash });
        // Если метод findOne не нашел требуемый док, то он
        // вернет -> null
        if (!lesson) {
            return 0;
        }
        const keynote = lesson.content.keynotes.find((keynote) => keynote.hash === keynoteHash);
        // Если keynote в массиве keynotes не будет найден, то keynote === undefined
        if (!keynote) {
            return -1;
        }

        // {
        //     "_id": "60ad052eea30cb559cbac1fa",
        //     "title": "Node.js architecture5",
        //     "order": 1,
        //     "uri": "https://lectrum.io/keynotes/lesson-15",
        //     "hash": "84dfc7f7-3d79-47b0-b669-1cd8662d4ad4"
        // }
        return keynote;
    }

    // DELETE /lessons/:lessonHash/keynotes/:keynoteHash
    async removeKeynoteByHash(lessonHash, keynoteHash) {
        // В коллекции уроков ищется док по полю hash: lessonHash,
        // затем в массиве content.keynotes этого дока ищется элемент
        // по полю hash: keynoteHash и этот элемент удаляется из массива
        const lesson = await lessonModel.findOne({ hash: lessonHash });
        // Если метод findOne не нашел требуемый док, то он
        // вернет -> null
        if (!lesson) {
            return 0;
        }
        const keynote = lesson.content.keynotes.find((keynote) => keynote.hash === keynoteHash);
        // Если keynote в массиве keynotes не будет найден, то keynote === undefined
        if (!keynote) {
            return -1;
        }
        // Удаляем keynote-элемент из массива
        lesson.content.keynotes.splice(lesson.content.keynotes.indexOf(keynote), 1);

        return lesson.save();
    }
}

