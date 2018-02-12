import { group, GET, POST } from '@ffra/route-designer'
import Rest from '@ffra/koa-rest-mongoose'
import SkillAreas from './skillArea.service'
import { verifyAndDecodeToken, extractToken } from '../../hooks/auth'

export default group(
    Rest.find('skillArea', SkillAreas),
    Rest.findOne('skillArea', SkillAreas),
    Rest.create('skillArea', SkillAreas),
    Rest.update('skillArea', SkillAreas),
    Rest.delete('skillArea', SkillAreas)
)
    .before(extractToken, verifyAndDecodeToken)
    .doc({ tags: ['SkillArea'] })
