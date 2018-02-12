import Contents from './content.service'
import { PilotSkills } from '../pilot'
import { Skills } from '../skill'
import { Notifications } from '../notifications'
import { Audits } from '../audit'
import Model from './content.model'

import * as config from 'config'
import { BadRequest, NotFound } from '@ffra/errors'

import {
    uploadImage,
    minioRemove,
    localRemove
} from '../../helpers/imageUploads'
import { Content } from './index';

export const publishContent = async function(ctx, next) {
    const {
        old_version: oldVersion,
        new_version: newVersion,
        operation
    } = ctx.params
    const content = ctx.hook && ctx.hook.data ? ctx.hook.data : ctx.request.body

    if (content.type !== 'coach' && content.type !== 'skill') {
        throw new BadRequest('Type not have valid value')
    }

    let newContent: any = {}

    if (content.type === 'coach') {
        let contentsOld = await Contents.find({
            skillId: content.skillId,
            version: newVersion,
            type: content.type,
            status: 'published'
        })

        let oldContent = contentsOld.data && contentsOld.data[0]

        if (oldContent) {
            newContent = await Contents.update({ _id: oldContent._id }, content)
            newContent = Contents.output(newContent)
        } else {
            newContent = await Contents.create(content)
            newContent = Contents.output(newContent)
        }

        await Audits.publishCoachContent(ctx.hook.user.id, newContent)
    } else if (content.type === 'skill') {
        newContent = await Contents.create(content)
        newContent = Contents.output(newContent)

        if (operation === 'major') {
            let userSkills = await PilotSkills.find({
                skillId: content.skillId,
                deprecated: false
            })

            await userSkills.data.map(userSkill =>
                PilotSkills.update({ _id: userSkill._id }, { deprecated: true })
            )
        }

        await Promise.all([
            Audits.publishContent(operation, ctx.hook.user.id, {
                vOld: oldVersion,
                vNew: newVersion,
                contentId: newContent.id,
                skillId: content.skillId
            }),
            Skills.update({ _id: content.skillId }, { latest: newVersion })
        ])
    }

    ctx.hook.data = newContent
    next()
}

export const postImages = async function(ctx, next) {
    let url = await uploadImage('content', 'file', ctx)
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

export const renameContentSkill = async function(ctx, next) {
    const content = ctx.hook && ctx.hook.data ? ctx.hook.data : ctx.request.body
    const { oldValue, newValue } = content;

    if (oldValue && newValue)
        ctx.hook.data = await Model.update({ skill: oldValue }, { skill: newValue }, { multi: true })
    
    next()
}