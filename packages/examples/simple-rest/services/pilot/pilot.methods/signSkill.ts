import { PilotSkills } from '../pilot.services'
import { BadRequest } from '@ffra/errors'
import { getAuth } from '../../../hooks/auth'

export const signSkill = async function(ctx, next) {
    let skillId = ctx.params.skillId
    let userId = ctx.params.userId
    let comments = ctx.request.body.comments

    let pilotSkill = await PilotSkills.find(
        {
            userId,
            skillId: skillId
        },
        1,
        0,
        false,
        { createdAt: -1 }
    )

    let lastAnswer = pilotSkill.data[0] ? pilotSkill.data[0] : null

    if (!lastAnswer) {
        throw new BadRequest('pilotSkill not found')
    }

    if (lastAnswer.completed !== 1) {
        throw new BadRequest('pilotSkill is not completed')
    }

    if (!lastAnswer.requiresSignOff) {
        throw new BadRequest('pilotSkill is not required to be signed')
    }

    if (lastAnswer.requiresSignOff && lastAnswer.signedByCoach) {
        throw new BadRequest('pilotSkill is already signed')
    }

    lastAnswer.signedByCoach = true
    lastAnswer.coachId = getAuth(ctx).id
    lastAnswer.coachSignedOn = new Date()
    lastAnswer.coachComments = comments

    let _id = lastAnswer.id

    let pilotSkillUpdated = await PilotSkills.update({ _id }, lastAnswer)

    ctx.hook.data = PilotSkills.output(pilotSkillUpdated)
    await next()
}
