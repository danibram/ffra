import { array, object, arrayRelated } from '@ffra/swagger'

export default {
    PilotScore: object({
        userId: {
            type: 'string',
            format: 'mongoId',
            description: 'User Id'
        },
        data: {
            type: 'object',
            properties: {}
        }
    })
}
