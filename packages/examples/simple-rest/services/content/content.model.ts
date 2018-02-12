import * as mongoose from 'mongoose'

const resource = {
    title: { type: String },
    summary: { type: String },
    link: { type: String },
}

const contentSchema = new mongoose.Schema({
    skillId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill'
    },
    skill: { type: String, required: true },
    type: { type: String, enum: ['skill', 'coach'] },
    version: { type: String, required: true },
    comments: { type: String },
    status: { type: String, enum: ['draft', 'published'] },
    description: { type: String },
    media: {
        title: { type: String },
        type: { type: String },
        summary: { type: String },
        link: { type: String },
        attrs: [{ type: String }]
    },
    faq: [{
        question: { type: String },
        answer: { type: String }
    }],
    listen: [resource],
    read: [resource],
    watch: [resource],
    relatedSkills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill'
    }]
}, { timestamps: true })

export default mongoose.model('Content', contentSchema)
