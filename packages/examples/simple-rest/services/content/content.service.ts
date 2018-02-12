import Service from '@ffra/service-mongoose'
import Model from './content.model'

class Contents extends Service {
    constructor(model) {
        super('Contents', model)
    }
}

export default new Contents(Model)
