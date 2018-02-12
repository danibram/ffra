import * as mongoose from 'mongoose'

const pilotSkillItem = new mongoose.Schema(
    {
        completed: {
            type: Boolean,
            default: false
        },
        completedOn: {
            type: Date,
            default: new Date()
        },
        completedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: {
            type: String
        }
    },
    { _id: false }
)

// Model
const pilotSkill = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        skillId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Skill',
            required: true
        },

        completed: {
            type: Number,
            default: 0
        },

        requiresSignOff: {
            type: Boolean,
            default: false
        },

        items: {},

        // If the skill need to be signed

        signedByCoach: {
            type: Boolean
        },

        coachId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        coachSignedOn: {
            type: Date
        },

        coachComments: {
            type: String
        },

        contentVersion: {
            type: String
        },

        deprecated: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

export const PilotSkill = mongoose.model('PilotSkill', pilotSkill)
