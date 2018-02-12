import { array, object, arrayRelated } from '@ffra/swagger'

export default {
    SkillArea: object({
        name: { type: 'string' },
        description: { type: 'string' },
        colour: { type: 'string' },
        data: { type: 'string' },
        link: { type: 'string' },
        order: { type: 'integer' },

        moduleId: {
            type: 'string',
            format: 'mongoId',
            description: 'Module Id'
        },

        layerId: {
            type: 'string',
            format: 'mongoId',
            description: 'Layer Id'
        }
    })
}
