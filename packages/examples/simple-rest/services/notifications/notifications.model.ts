import * as mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        message: { type: String },
        key: { type: String },
        params: {},
        read: { type: Boolean, default: false }
    },
    { timestamps: true }
)

notificationSchema.index({ userId: 1 })

export default mongoose.model('Notifications', notificationSchema)
