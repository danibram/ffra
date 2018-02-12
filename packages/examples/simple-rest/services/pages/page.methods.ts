import Contents from './page.service'
import { PilotSkills } from '../pilot'
import { Skills } from '../skill'
import { Notifications } from '../notifications'
import { Audits } from '../audit'

import * as config from 'config'
import { BadRequest, NotFound } from '@ffra/errors'

import {
    uploadImage,
    minioRemove,
    localRemove
} from '../../helpers/imageUploads'

export const postImages = async function(ctx, next) {
    let url = await uploadImage('page', 'file', ctx)
    ctx.body = {
        link: url.url
    }
}

export const deleteImages = async function(ctx, next) {
    let url = ctx.request.body.link.split('/').reverse()

    await localRemove(url[1], url[0])
    // await minioRemove(url[1], url[0])

    ctx.hook.data = `Deleted image ${ctx.request.body.link}`

    next()
}
