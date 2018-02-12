import Service from '@ffra/service-mongoose'
import Model from './assessment.model'

class Assessment extends Service {
    constructor(model) {
        super('Assessment', model)
    }

    _output = assessment => {
        assessment = assessment.toObject({ getters: true })

        delete assessment.__v

        assessment.id = assessment._id
        delete assessment._id

        assessment.questions.map(q => {
            q.id = q.id
            delete q._id
            q.answers.map(a => {
                a.id = a.id
                delete a._id
                return a
            })
            return q
        })

        return assessment
    }
}

export default new Assessment(Model)
