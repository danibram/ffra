import { DELETE, GET, POST, PUT } from '@ffra/route-designer'
import { Create, Delete, Find, FindOne, Update } from './primitives'

export default {
    find: (path, service, ...opts) =>
        GET(`${path}`, Find(service, ...opts)).meta({
            schema: {
                description: `Get some ${service.name}s`,
                tags: [service.name],
                query: {
                    type: 'object',
                    properties: {
                        filter: {
                            type: 'object',
                            description: `Limit of the search`
                        },
                        limit: {
                            type: 'string',
                            description: `Limit of the search`
                        },
                        skip: {
                            description: `Skip of the search`,
                            type: 'string'
                        },
                        count: {
                            description: `Show total of the search`,
                            type: 'string'
                        },
                        sort: {
                            description: `Sort params`,
                            type: 'string'
                        }
                    }
                }
            }
        }),

    findOne: (path, service, ...opts) =>
        GET(`${path}/:id`, FindOne(service, ...opts)).meta({
            schema: {
                description: `Get one ${service.name} by id`,
                params: {
                    type: 'object',
                    properties: {
                        id: {
                            description: `ID of ${service.name}`,
                            type: 'string'
                        }
                    }
                }
            }
        }),

    create: (path, service, ...opts) =>
        POST(`${path}`, Create(service, ...opts)).meta({
            schema: {
                description: `Create ${service.name}s`
            }
        }),

    update: (path, service, ...opts) =>
        PUT(`${path}/:id`, Update(service, ...opts)).meta({
            schema: {
                description: `Update ${service.name} by id`,
                params: {
                    type: 'object',
                    properties: {
                        id: {
                            description: `ID of ${service.name}`,
                            type: 'string'
                        }
                    }
                }
            }
        }),

    delete: (path, service, ...opts) =>
        DELETE(`${path}/:id`, Delete(service, ...opts)).meta({
            schema: {
                description: `Delete ${service.name} by id`,
                params: {
                    type: 'object',
                    properties: {
                        id: {
                            description: `ID of ${service.name}`,
                            type: 'string'
                        }
                    }
                }
            }
        })
}
