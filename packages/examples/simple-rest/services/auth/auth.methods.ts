const debug = require('debug')('bhpa-methods-auth')

import { User, Users } from '../user'
import { NotFound } from '@ffra/errors'
import { findOne } from '@ffra/service-mongoose'
import { generateToken } from '../../helpers/jwt'
export const auth = async function(ctx, next) {
    debug('auth')

    let { email, password } = ctx.request.body

    let user = await findOne(User, { email })

    if (!user || !(user as any).checkPassword(password)) {
        throw new NotFound(`User/password not found.`)
    }

    ctx.hook.data = {
        token: generateToken(Users.output(user))
    }

    next()
}

export const rauth = async function(ctx, next) {
    debug('rauth')

    ctx.hook.data = {
        token: ctx.hook.user.generateJwt()
    }
    next()
}

export const authAs = async function(ctx, next) {
    ctx.debug('authAs')

    let id = ctx.params.user_id
    console.log(id)

    let user = await Users.findOne({ _id: id })

    console.log(user)

    ctx.hook.data = {
        token: generateToken(Users.output(user))
    }

    next()
}
