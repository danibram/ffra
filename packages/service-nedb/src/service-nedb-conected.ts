import Service from '@ffra/service'
import { find, findOne, create, update, del } from './nedb-operations'

export class MService extends Service {
    constructor(name, model) {
        super(name, model, {
            findOne,
            find,
            create,
            update,
            delete: del
        })
    }

    _output = data => {
        if (data._id) {
            data.id = data._id
            delete data._id
        }

        return data
    }
}
