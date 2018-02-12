import { array, object, arrayRelated } from '@ffra/swagger'

export default {
    'Skill.item': object({
        item: { type: 'string' },
        description: { type: 'string' }
    }),
    Skill: object({
        name: { type: 'string' },
        latest: { type: 'string' },
        curator: {
            type: 'string',
            format: 'mongoId',
            description: 'User Id'
        },

        effectiveDate: { type: 'date' },
        link: { type: 'string' },

        // Relations
        skillAreaId: {
            type: 'string',
            format: 'mongoId',
            description: 'SkillArea Id'
        },

        requiresSignOff: { type: 'boolean' },
        duration: { type: 'integer' },
        skillMasteringChecklist: arrayRelated('Skill.item')
    })
}
