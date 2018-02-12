import * as mongoose from 'mongoose'

const moduleSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        order: { type: Number, required: true },
        colour: { type: String, required: true },
        icon: { type: String, required: true },
        link: { type: String },

        // Relations
        disciplineId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Discipline'
        }
    },
    { timestamps: true }
)

export default mongoose.model('Module', moduleSchema)
