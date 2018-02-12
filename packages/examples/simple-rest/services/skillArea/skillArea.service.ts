import Service from '@ffra/service-mongoose'
import Model from './skillArea.model'

class SkillArea extends Service {
    constructor(model) {
        super('SkillArea', model)
    }
}

export default new SkillArea(Model)
