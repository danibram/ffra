import { Users, User } from '../../user'
import { PilotScores, PilotSkills } from '../pilot.services'
import { PilotSkill } from '../pilot.models'
import { Notifications } from '../../notifications'
import { Audits } from '../../audit'
import { Skills } from '../../skill'

import { BadRequest } from '@ffra/errors'

import mailer from '../../../core/Mailer'

export const createFeedback = async function(ctx, next) {
    let { userId, skillId } = ctx.params

    let { skillType, version, feedback, contentId } = ctx.request.body

    let [skill, user] = await Promise.all([
        Skills.findOne({ _id: skillId }),
        Users.findOne({ _id: userId })
    ])

    if (!skill.curator) {
        throw new BadRequest(`No curator assigned for skill ${skillId}`)
    }

    let curator = await Users.findOne({ _id: skill.curator })
    let userFullName = user.fullName

    await Promise.all([
        mailer.renderAndSend(curator.email, 'feedback.content', {
            contentId,
            feedback,
            userFullName,
            userId
        }),
        Audits.feedbackCreation(userId, {
            skillId,
            skillType,
            version,
            feedback
        })
    ])

    ctx.hook.data = 'OK'
    next()
}
