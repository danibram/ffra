import Service from '@ffra/service-mongoose'
import Model from './discipline.model'

class Discipline extends Service {
    constructor(model) {
        super('Discipline', model)
    }
}

export default new Discipline(Model)
