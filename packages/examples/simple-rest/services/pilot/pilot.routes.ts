import { group, GET, POST } from '@ffra/route-designer'
import { Users, User } from '../user'
import {
    getMe,
    populateAuthUser,
    verifyAndDecodeToken,
    extractToken
} from '../../hooks/auth'
import {
    getPilot,
    signSkill,
    sendAssessment,
    sendSkill,
    getPilotNotifications,
    getCompletedSkills,
    createFeedback
} from './pilot.methods'
import { populator } from '../../hooks/populator'

export default group(
    POST('pilots/:userId/assessment/:assessmentId/send', sendAssessment),
    POST('pilots/:userId/skill/:skillId/send', sendSkill),
    POST('pilots/:userId/skill/:skillId/sign', signSkill).after(
        populator({ name: 'userId', service: Users }),
        populator({ name: 'coachId', service: Users })
    ),

    POST('pilots/:userId/skill/:skillId/feedback', createFeedback),

    GET('pilots/:userId', getPilot).before(getMe('userId')),

    GET('pilots/:userId/notifications', getPilotNotifications).before(
        getMe('userId')
    ),

    GET('pilots/skills/:skillId/completed', getCompletedSkills).after(
        populator({ name: 'userId', service: Users }),
        populator({ name: 'coachId', service: Users })
    )
)
    .before(extractToken, verifyAndDecodeToken, populateAuthUser)
    .doc({ tags: ['Pilot'] })
