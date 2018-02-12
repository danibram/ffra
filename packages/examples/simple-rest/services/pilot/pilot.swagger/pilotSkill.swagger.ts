import { array, object, arrayRelated } from '@ffra/swagger'

export default {
    'PilotSkill.item': object({
        completed: {
            type: 'boolean'
        },
        completedOn: {
            type: 'date'
        },
        completedBy: {
            type: 'string',
            format: 'mongoId',
            description: 'User Id'
        },
        comments: {
            type: 'string'
        }
    }),
    PilotSkill: object({
        userId: {
            type: 'string',
            format: 'mongoId',
            description: 'User Id'
        },

        skillId: {
            type: 'string',
            format: 'mongoId',
            description: 'Skill Id'
        },

        completed: {
            type: 'float'
        },

        requiresSignOff: {
            type: 'boolean'
        },

        items: object({}),

        signedByCoach: {
            type: 'boolean'
        },

        coachId: {
            type: 'string',
            format: 'mongoId',
            description: 'User Id'
        },

        coachSignedOn: {
            type: 'date'
        },

        coachComments: {
            type: 'string'
        }
    })
}
