import { group, GET, POST } from '@ffra/route-designer'
import { auth, rauth, authAs } from './auth.methods'
import {
    verifyAndDecodeToken,
    populateAuthUser,
    authenticated,
    onlyAdmin,
    extractToken
} from '../../hooks'

export default group(
    POST('auth', auth).doc({
        parameters: [
            {
                in: 'body',
                name: 'authData',
                description: 'User password',
                required: true,
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string'
                        },
                        password: {
                            type: 'string'
                        }
                    }
                }
            }
        ],
        responses: {
            200: {
                schema: {
                    type: 'object',
                    properties: {
                        token: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    }),

    POST('auth/as/:user_id', authAs).before(
        extractToken,
        verifyAndDecodeToken,
        populateAuthUser,
        onlyAdmin
    ),

    POST('rauth', rauth).before(
        extractToken,
        verifyAndDecodeToken,
        populateAuthUser,
        authenticated
    )
).doc({ tags: ['Auth'] })
