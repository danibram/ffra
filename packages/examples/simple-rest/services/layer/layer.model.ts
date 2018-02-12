import * as mongoose from 'mongoose'

const layerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        order: { type: Number, required: true },
        description: { type: String },
        link: { type: String },

        // Normal Layer
        prelabel: { type: String },
        relativeWeight: { type: Number },

        // Default Layer
        colour: { type: String },
        default: { type: Boolean },
        fixed: { type: Boolean }
    },
    { timestamps: true }
)

export default mongoose.model('Layer', layerSchema)
