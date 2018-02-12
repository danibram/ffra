import { group, GET } from '@ffra/route-designer'

export default group(
    GET('healthz', async function(ctx, next) {
        ctx.body = 'OK'
    })
)
