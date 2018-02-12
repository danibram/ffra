import { group, GET, POST } from '@ffra/route-designer'
import Rest from '@ffra/koa-rest-mongoose'
import Users from './user.service'
import {
    postPhoto,
    renderPhoto,
    resetPasswordEmail,
    resetPassword
} from './user.methods'
import {
    getMe,
    populateAuthUser,
    verifyAndDecodeToken,
    extractToken
} from '../../hooks/auth'

export default group(
    Rest.find('users', Users),

    Rest.findOne('users', Users).before(populateAuthUser, getMe()),

    Rest.create('users', Users),

    Rest.update('users', Users).before(populateAuthUser, getMe()),

    Rest.delete('users', Users).before(populateAuthUser, getMe()),

    POST('users/:id/photo', postPhoto),
    GET('users/:id/photo', renderPhoto),

    POST('users/resetPassword/email', resetPasswordEmail),
    POST('users/resetPassword', resetPassword)
)
    .before(extractToken, verifyAndDecodeToken)
    .doc({ tags: ['User'] })
