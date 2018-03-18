import Service from '@ffra/service-mongoose'
import CatModel from './cat.model'

import * as config from 'config'

class Cats extends Service {
    constructor(model) {
        super('Cats', model)
    }
}

export default new Cats(CatModel)
