import * as debug from 'debug'

export const finalHook = async (ctx, next) => {
    let end = new Date()
    let result: any = {}

    if (ctx.hook.data) {
        result.metadata = (ctx.hook.metadata) ? ctx.hook.metadata : {}
        result.metadata.time = new Date().getTime() - ctx.hook.start.getTime()
        result.data = ctx.hook.data
    } else if (ctx.hook.raw) {
        result = ctx.hook.raw
    }
    ctx.body = result
    await next()
}

export const initialHook = async (ctx, next) => {
    ctx.hook = {}
    ctx.hook.start = new Date
    ctx.debug = debug(`bhpa-request-${Math.random().toString().slice(2)}`)
    await next()
}