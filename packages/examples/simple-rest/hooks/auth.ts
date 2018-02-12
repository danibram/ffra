import * as util from 'util'

import { BadRequest, NotAuthenticated, Forbidden } from '@ffra/errors'
import * as config from 'config'

import User from '../services/user/user.model'

import { findOne } from '@ffra/service-mongoose'
import { decodeToken } from '../helpers/jwt'

// helpers
export const authField = 'auth'
export const getAuth = ctx => ctx.hook[authField]
export const setAuth = (ctx, value) => {
    ctx.hook[authField] = value
}

// hooks
export const extractToken = async function(ctx, next) {
    ctx.debug('extractToken')
    let authHeaders = ctx.request.headers.authorization
    let token = authHeaders
        ? /bearer/i.test(authHeaders) ? authHeaders.split(' ')[1] : authHeaders
        : null

    if (!token && ctx.request.body.authorization) {
        token = ctx.request.body.authorization
        delete ctx.request.body.authorization
    } else if (!token && ctx.request.query.authorization) {
        token = ctx.request.query.authorization
        delete ctx.request.query.authorization
    }

    if (token) {
        ctx.request.token = token
        ctx.hook.token = token
    }

    await next()
}

export const verifyAndDecodeToken = async function(ctx, next) {
    ctx.debug('verifyAndDecodeToken')

    if (!ctx.hook.token) {
        return next()
    }

    let token = ctx.hook.token

    let payload = await decodeToken(token, config.get('auth.secret'))

    setAuth(ctx, payload)

    await next()
}

export const populateAuthUser = async function(ctx, next) {
    ctx.debug('populateAuthUser')

    if (!ctx.hook.token) {
        return next()
    }

    if (!getAuth(ctx)) {
        return next()
    }

    let _id = getAuth(ctx).id

    let user = await User.findOne({ _id })
        .exec()
        .then(data => data)

    if (!user) {
        throw new NotAuthenticated(`No User found`)
    }

    ctx.hook.user = user

    await next()
}

export const authenticated = async function(ctx, next) {
    ctx.debug('authenticated')

    if (!ctx.hook.user) {
        throw new NotAuthenticated('You are not authenticated.')
    }

    await next()
}

export const getMe = (param = 'id') =>
    async function(ctx, next) {
        ctx.debug('me')

        if (!ctx.hook.user && ctx.params[param] === 'me') {
            throw new NotAuthenticated('You are not authenticated.')
        }

        if (ctx.hook.user && ctx.params[param] === 'me') {
            ctx.params[param] = ctx.hook.user.id
        }

        await next()
    }

export const onlyAdmin = async function(ctx, next) {
    ctx.debug('onlyAdmin')

    if (!ctx.hook.user) {
        throw new NotAuthenticated('You are not authenticated.')
    }

    if (
        ctx.hook.user &&
        ctx.hook.user.roles &&
        ctx.hook.user.roles.indexOf('admin') < 0
    ) {
        throw new Forbidden('You cant perform this action.')
    }

    await next()
}
