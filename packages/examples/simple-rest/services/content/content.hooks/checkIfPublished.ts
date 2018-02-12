import Contents from '../content.service'
import { BadRequest } from '@ffra/errors'

export const checkIfPublished = async (ctx, next) => {
    ctx.debug('checkIfPublished')

    const {
        old_version: oldVersion,
        new_version: newVersion,
        operation
    } = ctx.params
    const content = ctx.hook && ctx.hook.data ? ctx.hook.data : ctx.request.body

    if (content.type === 'skill') {
        let contentsOld = await Contents.find({
            skillId: content.skillId,
            version: newVersion,
            type: 'skill',
            status: 'published'
        })

        if ([].concat(contentsOld.data).length > 0) {
            throw new BadRequest(`This content/version was already published`)
        }
    }

    return next()
}
