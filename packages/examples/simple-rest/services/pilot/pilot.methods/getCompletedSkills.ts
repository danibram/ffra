import { Users, User } from '../../user'
import { PilotScores, PilotSkills } from '../pilot.services'
import { PilotSkill } from '../pilot.models'
import { Notifications } from '../../notifications'
import { Audits } from '../../audit'
import { Skills } from '../../skill'

import { populator } from '../../../hooks/populator'

export const getCompletedSkills = async function(ctx, next) {
    let skillId = ctx.params.skillId

    let result = await PilotSkills.find({
        skillId,
        requiresSignOff: true
    })

    ctx.hook.metadata = result.metadata
    ctx.hook.data = PilotSkills.output(result.data)

    await next()
}
