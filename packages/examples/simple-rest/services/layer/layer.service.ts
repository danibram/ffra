import Service from '@ffra/service-mongoose'
import Model from './layer.model'

class Layer extends Service {
    constructor(model) {
        super('Layer', model)
    }
}

export default new Layer(Model)
