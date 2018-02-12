import * as mongoose from 'mongoose'

const skillAreaSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        colour: { type: String },
        data: { type: String },
        link: { type: String },
        order: { type: Number },

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
    { timestamps: true }
)

export default mongoose.model('SkillArea', skillAreaSchema)
