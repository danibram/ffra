import { array, object, arrayRelated } from '@ffra/swagger'

export default {
    Discipline: object({
        name: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        createdAt: {
            type: 'date'
        },
        updatedAt: {
            type: 'date'
        }
    })
}
