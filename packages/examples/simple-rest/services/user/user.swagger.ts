import { array, object, arrayRelated } from '@ffra/swagger'

export default {
    User: object({
        email: { type: 'string' },

        recoveryToken: { type: 'string' },
        passwordHash: { type: 'string' },
        salt: { type: 'string' },

        locale: { type: 'string' },

        disciplines: array({ type: 'string' }),
        bhpaLicense: { type: 'string' },
        fullName: { type: 'string' },
        description: { type: 'string' },
        active: { type: 'boolean' },
        membershipExpirationDate: { type: 'date' },
        picture: { type: 'string' },

        roles: array({
            type: 'string',
            enum: ['user', 'coach', 'contributor', 'staff', 'admin']
        }),
        lastLogin: { type: 'date' }
    })
}
