import * as debug from 'debug'

const deb = debug('@ffra/koa-rest-mongoose')

export const composeIdQuery = param => (req: any) => {
    let id = req.params.id
        ? req.params.id
        : req.body[param] ? req.body[param] : null

    deb(`Composing query { ${param}: ${id} }`)

    return { [param]: id } as any
}

export const defaultQuery = (req: any) => {
    return {} as any
}

export const FindOne = function(service, id = '_id') {
    return async function(ctx, next) {
        let query = composeIdQuery(id)

        ctx.debug && ctx.debug('findOne-in')

        let data = await service.findOne(query(ctx))

        ctx.debug && ctx.debug('findOne-out')

        ctx.hook.data = service.output(data)

        ctx.debug && ctx.debug('findOne-output')

        await next()
    }
}

export const Find = function(service, query = defaultQuery) {
    return async function(ctx, next) {
        let q = ctx.query.filter ? ctx.query.filter : query(ctx.request)
        const limit = ctx.query.limit ? parseInt(ctx.query.limit) : 20
        const skip = ctx.query.skip ? parseInt(ctx.query.skip) : 0
        const count = ctx.query.count ? ctx.query.count : false
        const sort = ctx.query.sort ? ctx.query.sort : {}

        if (ctx.query.search) {
            let keys = Object.keys(ctx.query.search)
            keys.map(k => {
                q[k] = {
                    $regex: new RegExp(ctx.query.search[k], 'ig')
                }
            })
        }

        if (ctx.query.in) {
            let keys = Object.keys(ctx.query.in)
            keys.map(k => {
                q[k] = {
                    $in: ctx.query.in[k].split(',')
                }
            })
        }

        ctx.debug && ctx.debug('find-in')
        let { metadata, data } = await service.find(q, limit, skip, count, sort)
        ctx.debug && ctx.debug('find-out')
        ctx.hook.metadata = metadata
        ctx.hook.data = service.output(data)
        ctx.debug && ctx.debug('find-output')
        await next()
    }
}

export const Create = function(service, ...opts) {
    return async function(ctx, next) {
        const data =
            ctx.hook && ctx.hook.data ? ctx.hook.data : ctx.request.body
        ctx.debug && ctx.debug('create-in')
        let dataRaw = await service.create(data, ...opts)
        ctx.debug && ctx.debug('create-out')
        ctx.hook.data = service.output(dataRaw)
        ctx.debug && ctx.debug('create-output')
        await next()
    }
}

export const Update = function(service, id = '_id', ...opts) {
    return async function(ctx, next) {
        let query = composeIdQuery(id)
        let data = ctx.request.body

        if (data[id]) {
            delete data[id]
        }

        ctx.debug && ctx.debug('update-in')
        let dataRaw = await service.update(query(ctx), data, ...opts)
        ctx.debug && ctx.debug('update-out')
        ctx.hook.data = service.output(dataRaw)
        ctx.debug && ctx.debug('update-output')
        await next()
    }
}

export const Delete = function(service, id = '_id', ...opts) {
    return async function(ctx, next) {
        let query = composeIdQuery(id)

        ctx.debug && ctx.debug('delete-in')
        let data = await service.delete(query(ctx), ...opts)
        ctx.debug && ctx.debug('delete-out')
        ctx.hook.data = service.output(data)
        ctx.debug && ctx.debug('delete-output')
        await next()
    }
}
