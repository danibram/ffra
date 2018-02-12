import * as uuid from 'uuid'

import { Users } from './'
import * as config from 'config'
import { findOne } from '@ffra/service-mongoose'
import { BadRequest, NotFound } from '@ffra/errors'

import mailer from '../../core/Mailer'

import { uploadImage, localRemove } from '../../helpers/imageUploads'

export const postPhoto = async function(ctx, next) {
    let id = ctx.params.id

    let image = await uploadImage('profile', 'file', ctx, 200, 200, id)

    try {
        let oldUser = await Users.findOne({ _id: id })
        let user = await Users.update({ _id: id }, { picture: image.filename })

        if ((oldUser as any).picture && (oldUser as any).picture !== '') {
            await localRemove('profile', (oldUser as any).picture)
        }

        ctx.hook.data = 'OK'
        next()
    } catch (error) {
        await localRemove('profile', image.filename)
        throw error
    }
}

export const renderPhoto = function(ctx, next) {
    let id = ctx.params.id
    ctx.body = `<form action="/v1/users/${
        id
    }/photo" enctype="multipart/form-data" method="post">
                <input type="file" name="file" multiple="multiple"><br>
                <input type="submit" value="Upload">
                </form>`
}

export const resetPassword = async function(ctx, next) {
    let { recoveryToken, password } = ctx.request.body

    let user = await Users.findOne({ recoveryToken: recoveryToken })

    user.password = password
    user.recoveryToken = ''

    user = await Users.update({ _id: user.id }, user)

    ctx.hook.data = 'OK'
    next()
}

export const resetPasswordEmail = async function(ctx, next) {
    let recoveryToken = uuid.v4()
    let { email } = ctx.request.body

    let user = await Users.update({ email: email }, { recoveryToken })

    await mailer.renderAndSend(email, 'password.recovery', { recoveryToken })
    ctx.hook.data = 'OK'
    next()
}
