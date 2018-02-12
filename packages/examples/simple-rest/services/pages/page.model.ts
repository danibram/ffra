import * as mongoose from 'mongoose'

const pageSchema = new mongoose.Schema(
    {
        title: { type: String },
        link: { type: String },
        content: { type: String, required: true },
        status: { type: String, enum: ['draft', 'published'] }
    },
    { timestamps: true }
)

export default mongoose.model('Page', pageSchema)
