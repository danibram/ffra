import { array, object, arrayRelated } from '@ffra/swagger'

export default {
    PilotAssessment: object({
        userId: {
            type: 'string',
            format: 'mongoId',
            description: 'User Id',
            required: true
        },

        assessmentId: {
            type: 'string',
            format: 'mongoId',
            description: 'Assessment Id',
            required: true
        },

        completed: {
            type: 'float',
            default: 0
        },

        items: {
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
