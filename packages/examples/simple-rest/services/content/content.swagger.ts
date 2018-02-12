import { object } from '@ffra/swagger'

export default {
    Content: object({
        skillId: {
            type: 'string',
            format: 'mongoId',
            description: 'Skill Id'
        },
        skill: {
            type: 'string',
            description: ''
        },
        version: {
            type: 'string',
            description: ''
        },
        content: {
            type: 'string',
            description: ''
        },
        comments: {
            type: 'string',
            description: ''
        },
        status: {
            type: 'string',
            description: ''
        }
    })
}
