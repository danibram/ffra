import Service from '@ffra/service-mongoose'
import Model from './page.model'

class Pages extends Service {
    constructor(model) {
        super('Pages', model)
    }
}

export default new Pages(Model)
