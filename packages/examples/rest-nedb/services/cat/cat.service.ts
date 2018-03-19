import Service from '@ffra/service-nedb'
import * as Datastore from 'nedb'

const CatModel = new Datastore({ filename: './cats.db', autoload: true })

class Cats extends Service {
    constructor(model) {
        super('Cats', model)
    }
}

export default new Cats(CatModel)
