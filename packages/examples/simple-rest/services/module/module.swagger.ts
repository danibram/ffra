import { array, object, arrayRelated } from '@ffra/swagger'

export default {
    Module: object({
        name: { type: 'string', required: true },
        description: { type: 'string' },
        order: { type: 'integer', required: true },
        colour: { type: 'string', required: true },
        icon: { type: 'string', required: true },
        link: { type: 'string' },

        // Relations
        disciplineId: {
            type: 'string',
            format: 'mongoId',
            description: 'Discipline Id'
        }
    })
}
