import { array, object, arrayRelated } from '@ffra/swagger'

export default {
    Translation: object({
        key: { type: 'string' },
        domain: { type: 'string' },
        translations: {
            type: 'object',
            properties: {}
        },
        createdAt: {
            type: 'date'
        },
        updatedAt: {
            type: 'date'
        }
    })
}
