import * as mongoose from 'mongoose'

// Model
const disciplineSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String }
    },
    { timestamps: true }
)

export default mongoose.model('Discipline', disciplineSchema)
