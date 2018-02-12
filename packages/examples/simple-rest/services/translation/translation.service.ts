import Service from '@ffra/service-mongoose'
import TranslationModel from './translation.model'

class Translations extends Service {
    constructor(model) {
        super('Translations', model)
    }
}

export default new Translations(TranslationModel)
