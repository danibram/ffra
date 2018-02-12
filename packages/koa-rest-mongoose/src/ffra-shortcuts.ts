import { GET, POST, PUT, DELETE, Route } from '@ffra/route-designer'
import { Find, FindOne, Create, Update, Delete } from './koa-primitives'

const Rest = {
    find: (path, service, ...opts) => GET(`${path}`, Find(service, ...opts))
        .doc({
            description: `Get some ${service.name}s`,
            parameters: [{
                'name': 'limit',
                'in': 'query',
                'description': `Limit of the search`,
                'required': false,
                'type': 'string'
            }, {
                'name': 'skip',
                'in': 'query',
                'description': `Skip of the search`,
                'required': false,
                'type': 'string'
            }, {
                'name': 'count',
                'in': 'query',
                'description': `Show total of the search`,
                'required': false,
                'type': 'string'
            }, {
                'name': 'sort',
                'in': 'query',
                'description': `Sort params`,
                'required': false,
                'type': 'string'
            }]
        }),

    findOne: (path, service, ...opts) => GET(`${path}/:id`, FindOne(service, ...opts))
        .doc({
            description: `Get one ${service.name} by id`,
            parameters: [{
                'name': 'id',
                'in': 'path',
                'description': `ID of ${service.name}`,
                'required': true,
                'type': 'string'
            }]
        }),

    create: (path, service, ...opts) => POST(`${path}`, Create(service, ...opts))
        .doc({
            description: `Create ${service.name}s`
        }),

    update: (path, service, ...opts) => PUT(`${path}/:id`, Update(service, ...opts))
        .doc({
            description: `Update ${service.name} by id`,
            parameters: [{
                'name': 'id',
                'in': 'path',
                'description': `ID of ${service.name}`,
                'required': true,
                'type': 'string'
            }]
        }),

    delete: (path, service, ...opts) => DELETE(`${path}/:id`, Delete(service, ...opts))
        .doc({
            description: `Delete ${service.name} by id`,
            parameters: [{
                'name': 'id',
                'in': 'path',
                'description': `ID of ${service.name}`,
                'required': true,
                'type': 'string'
            }]
        })
}

export default Rest