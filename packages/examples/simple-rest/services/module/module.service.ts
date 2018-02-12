import Service from '@ffra/service-mongoose'
import Model from './module.model'

class Module extends Service {
    constructor(model) {
        super('Module', model)
    }
}

export default new Module(Model)
