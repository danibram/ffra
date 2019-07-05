import * as mongoose from 'mongoose'

const catSchema = new mongoose.Schema({
    name: {
        type: String
    }
})

export default mongoose.model('Cat', catSchema)
