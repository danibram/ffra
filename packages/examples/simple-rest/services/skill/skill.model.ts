import * as mongoose from 'mongoose'

const Item = new mongoose.Schema({
    item: { type: String, required: true },
    description: { type: String }
})

const skillSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        colour: { type: String },
        latest: { type: String, default: '0.0.0' },
        curator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        effectiveDate: { type: Date },
        link: { type: String },

        // Relations
        skillAreaId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SkillArea'
        },

        requiresSignOff: { type: Boolean, default: false },
        duration: { type: Number, default: 360 },
        skillMasteringChecklist: [Item],
        tags: [{ type: String }]
    },
    { timestamps: true }
)

export default mongoose.model('Skill', skillSchema)
