import * as mongoose from 'mongoose'
import * as config from 'config'

// TS interface
export interface ITranslations extends mongoose.Document {
    _id: string
    key: string
    domain: string
    translations: { [name: string]: string }
}

const translationSchema = new mongoose.Schema(
    {
        key: { type: String, required: true },
        domain: { type: String, required: true },
        translations: (config.get('locales') as any[]).reduce(
            (actual, locale) => {
                actual[locale] = { type: String, default: '' }
                return actual
            },
            {}
        )
    },
    { timestamps: true }
)

translationSchema.index({ key: 1, domain: 1 }, { unique: true })

export default mongoose.model('Translation', translationSchema)
