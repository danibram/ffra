import Service from '@ffra/service-mongoose'
import Model from './skill.model'

class Skills extends Service {
    constructor(model) {
        super('Skill', model)
    }

    _output = skill => {
        if (skill.toObject) {
            skill = skill.toObject()
            skill.id = skill._id
            delete skill._id
            delete skill.__v

            skill.skillMasteringChecklist.map(q => {
                q.id = String(q._id)
                delete q._id
            })
        }

        return skill
    }
}

export default new Skills(Model)
