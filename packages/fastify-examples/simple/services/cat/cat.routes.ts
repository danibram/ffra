import { GET, group } from '@ffra/route-designer'

export default group(
    GET(`cats`, async (f, req, res) => {
        // f.ctx.raw = true
        return f.ctx
    }).after(
        async (f, req, res) => {
            f.ctx.hook1 = true
            return
        },
        async (f, req, res) => {
            f.ctx.hook2 = true
            return
        },
        async (f, req, res) => {
            f.ctx.hook3 = true
            return
        }
    )
)
