import * as mongoose from 'mongoose'

const Scoring = new mongoose.Schema(
    {
        score: { type: Number },

        // Relations
        moduleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Module'
        },
        layerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Layer'
        }
    },
    { _id: false }
)

const Answer = new mongoose.Schema({
    answer: { type: String },
    scoring: [Scoring]
})

export const Options = new mongoose.Schema({
    question: { type: String },
    answers: [Answer]
})

const assessmentSchema = new mongoose.Schema({
    questions: [Options],

    // Relations
    disciplineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discipline'
    }
})

export default mongoose.model('Assessment', assessmentSchema)
