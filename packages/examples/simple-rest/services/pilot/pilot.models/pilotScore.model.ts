import * as mongoose from 'mongoose'

// Model
const pilotScore = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        data: {}
        /*
        [layerId]: {[moduleId]: value, [moduleId]: value, [moduleId]: value, ... }
        [layerId]: {[moduleId]: value, [moduleId]: value, [moduleId]: value, ... }
        [layerId]: {[moduleId]: value, [moduleId]: value, [moduleId]: value, ... }
        ...
    */
    },
    { timestamps: true }
)

export const PilotScore = mongoose.model('PilotScore', pilotScore)
