import { object, arrayRelated } from '@ffra/swagger'

export default {
    'Assessment.scoring': object({
        score: {
            type: 'float'
        },
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
    }),
    'Assessment.answers': object({
        answer: {
            type: 'string'
        },
        scoring: arrayRelated('Assessment.scoring')
    }),

    'Assessment.options': object({
        question: {
            type: 'string'
        },
        answers: arrayRelated('Assessment.answers')
    }),

    Assessment: object({
        questions: arrayRelated('Assessment.options'),
        disciplineId: {
            type: 'string',
            format: 'mongoId',
            description: 'Discipline Id'
        }
    })
}
