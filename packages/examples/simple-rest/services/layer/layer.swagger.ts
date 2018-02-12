import { array, object, arrayRelated } from '@ffra/swagger'

export default {
    Layer: object({
        name: { type: 'string', required: true },
        order: { type: 'integer', required: true },
        description: { type: 'string' },

        prelabel: { type: 'string' },
        relativeWeight: { type: 'float' },

        colour: { type: 'string' },
        default: { type: 'boolean' },
        fixed: { type: 'boolean' },
        createdAt: {
            type: 'date'
        },
        updatedAt: {
            type: 'date'
        }
    })
}
