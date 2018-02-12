import * as mongoose from 'mongoose'

const pilotAssessmentItem = new mongoose.Schema(
    {
        answer: {},
        question: {}
    },
    { _id: false }
)

// Model
const pilotAssessment = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        assessmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Assessment',
            required: true
        },

        completed: {
            type: Number,
            default: 0
        },

        items: {}
    },
    { timestamps: true }
)

export const PilotAssessment = mongoose.model(
    'PilotAssessment',
    pilotAssessment
)
