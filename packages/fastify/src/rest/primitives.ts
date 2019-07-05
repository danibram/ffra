import * as debug from 'debug'

const deb = debug('@ffra/fastify/rest')

export const composeIdQuery = param => (req: any) => {
    let id = req.params.id
        ? req.params.id
        : req.body[param]
        ? req.body[param]
        : null

    deb(`Composing query { ${param}: ${id} }`)

    return { [param]: id } as any
}

export const defaultQuery = (req: any) => {
    return {} as any
}

export const FindOne = function(service, id = '_id') {
    return async function(f, req, reply) {
        let query = composeIdQuery(id)

        deb('findOne-in')

        let data = await service.findOne(query(req))

        deb('findOne-out')

        return service.output(data)
    }
}

export const Find = function(service, query = defaultQuery) {
    return async function(f, req, reply) {
        let q = req.query.filter ? req.query.filter : query(req)
        const limit = req.query.limit ? parseInt(req.query.limit) : 20
        const skip = req.query.skip ? parseInt(req.query.skip) : 0
        const count = req.query.count ? req.query.count : false
        const sort = req.query.sort ? req.query.sort : {}

        if (req.query.search) {
            let keys = Object.keys(req.query.search)
            keys.map(k => {
                q[k] = {
                    $regex: new RegExp(req.query.search[k], 'ig')
                }
            })
        }

        if (req.query.in) {
            let keys = Object.keys(req.query.in)
            keys.map(k => {
                q[k] = {
                    $in: req.query.in[k].split(',')
                }
            })
        }

        deb('find-in')
        let { metadata, data } = await service.find(q, limit, skip, count, sort)
        deb('find-out')
        f.ctx.metadata = metadata
        return service.output(data)
    }
}

export const Create = function(service, ...opts) {
    return async function(f, req, reply) {
        const data = f.ctx.data ? f.ctx.data : req.body

        deb('create-in')
        let dataRaw = await service.create(data, ...opts)
        deb('create-out')
        return service.output(dataRaw)
    }
}

export const Update = function(service, id = '_id', ...opts) {
    return async function(f, req, reply) {
        let query = composeIdQuery(id)
        let data = req.body

        if (data[id]) {
            delete data[id]
        }

        deb('update-in')
        let dataRaw = await service.update(query(req), data, ...opts)
        deb('update-out')
        return service.output(dataRaw)
    }
}

export const Delete = function(service, id = '_id', ...opts) {
    return async function(f, req, reply) {
        let query = composeIdQuery(id)

        deb('delete-in')
        let data = await service.delete(query(req), ...opts)
        deb('delete-out')
        return service.output(data)
    }
}
