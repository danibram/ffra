import { object } from '@ffra/swagger'

export default {
    Page: object({
        content: {
            type: 'string',
            description: ''
        },
        status: {
            type: 'string',
            description: ''
        },
        link: {
            type: 'string',
            description: ''
        }
    })
}
