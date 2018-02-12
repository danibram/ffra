import Service from '@ffra/service-mongoose'
import { PilotAssessment } from '../pilot.models'

class PilotAssessmentService extends Service {
    constructor(model) {
        super('PilotAssessmentService', model)
    }
}

export const PilotAssessments = new PilotAssessmentService(PilotAssessment)
