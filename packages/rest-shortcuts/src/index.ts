import { GET, POST, PUT, DELETE, Route } from '@ffra/route-designer'
import { Find, FindOne, Create, Update, Delete } from '@ffra/koa-rest-mongoose'

const Rest = {
    find: (path, service) => GET(`${path}`, Find(service))
        .doc({
            description: `Get some ${service.name}s`,
            parameters: [{
                'name': 'limit',
                'in': 'query',
                'description': `Limit of the search`,
                'required': false,
                'type': 'string'
            },{
                'name': 'skip',
                'in': 'query',
                'description': `Skip of the search`,
                'required': false,
                'type': 'string'
            },{
                'name': 'count',
                'in': 'query',
                'description': `Show total of the search`,
                'required': false,
                'type': 'string'
            },{
                'name': 'sort',
                'in': 'query',
                'description': `Sort params`,
                'required': false,
                'type': 'string'
            }]
        }),

    findOne: (path, service) => GET(`${path}/:id`, FindOne(service))
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

    create: (path, service) => POST(`${path}`, Create(service))
        .doc({
            description: `Create ${service.name}s`
        }),

    update: (path, service) => PUT(`${path}/:id`, Update(service))
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

    delete: (path, service) => DELETE(`${path}/:id`, Delete(service))
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