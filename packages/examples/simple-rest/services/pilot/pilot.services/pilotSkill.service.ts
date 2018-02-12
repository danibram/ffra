import * as semver from 'semver'

import Service from '@ffra/service-mongoose'
import { PilotSkill } from '../pilot.models'

class PilotSkillService extends Service {
    constructor(model) {
        super('PilotSkillService', model)
    }

    outputToIndexedSkill(pilotSkills) {
        let result = {}
        pilotSkills
            .sort((a, b) => semver.gt(b.contentVersion, a.contentVersion))
            .forEach(pilotSkill => {
                let { skillId, contentVersion } = pilotSkill
                if (!result[skillId]) {
                    result[skillId] = {}
                }

                result[skillId][contentVersion] = pilotSkill
            })
        return result
    }
}

export const PilotSkills = new PilotSkillService(PilotSkill)
