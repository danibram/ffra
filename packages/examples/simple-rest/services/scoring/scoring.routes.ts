import { group, GET, POST } from '@ffra/route-designer'
import Rest from '@ffra/koa-rest-mongoose'
import { PilotScores } from '../pilot/pilot.services'
import { verifyAndDecodeToken, extractToken } from '../../hooks/auth'

export default group(
    Rest.find('scoring', PilotScores),
    Rest.findOne('scoring', PilotScores),
    Rest.create('scoring', PilotScores),
    Rest.update('scoring', PilotScores),
    Rest.delete('scoring', PilotScores)
)
    .before(extractToken, verifyAndDecodeToken)
    .doc({ tags: ['Scoring'] })
