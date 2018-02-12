import * as mongoose from 'mongoose'

// Model
const auditSchema = new mongoose.Schema(
    {
        action: { type: String, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        params: {}
    },
    { timestamps: true }
)

export default mongoose.model('Audit', auditSchema)
