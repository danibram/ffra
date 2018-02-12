import { Users } from '../../user'
import { PilotScores, PilotSkills } from '../pilot.services'
import { Notifications } from '../../notifications'
import { Audits } from '../../audit'
import { Skills } from '../../skill'

export const getPilot = async function(ctx, next) {
    let userId = ctx.params.userId

    await Notifications.syncNotifications(userId)

    let [users, scores, skills, notifications] = await Promise.all([
        Users.findOne({ _id: userId }),
        PilotScores.find(
            {
                userId
            },
            1,
            0,
            false,
            { createdAt: -1 }
        ),
        PilotSkills.find(
            {
                userId,
                completed: 1
                /*,
                '$or': [{
                    requiresSignOff: true,
                    signedByCoach: true
                }, {
                    requiresSignOff: { $ne: true }
                }]*/
            },
            10000
        ),
        Notifications.find(
            {
                userId,
                read: false
            },
            null,
            null,
            null,
            { createdAt: -1 }
        )
    ])

    ctx.hook.data = Object.assign({}, Users.output(users), {
        scores: scores.data[0] ? PilotScores.output(scores.data[0]) : null,
        skills: skills.data[0]
            ? PilotSkills.outputToIndexedSkill(PilotSkills.output(skills.data))
            : null,
        notifications: notifications.data[0]
            ? Notifications.output(notifications.data)
            : null
    })

    next()
}
