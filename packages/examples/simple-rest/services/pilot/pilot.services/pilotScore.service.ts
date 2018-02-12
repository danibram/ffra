import Service from '@ffra/service-mongoose'
import { PilotScore } from '../pilot.models'

class PilotScoreService extends Service {
    constructor(model) {
        super('PilotScoreService', model)
    }
}

export const PilotScores = new PilotScoreService(PilotScore)
