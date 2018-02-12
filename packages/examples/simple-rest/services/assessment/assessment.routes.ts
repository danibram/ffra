import { group, GET, POST } from '@ffra/route-designer'
import Rest from '@ffra/koa-rest-mongoose'
import Assessments from './assessment.service'
import { verifyAndDecodeToken, extractToken } from '../../hooks/auth'

export default group(
    Rest.find('assessment', Assessments),
    Rest.findOne('assessment', Assessments),
    Rest.create('assessment', Assessments),
    Rest.update('assessment', Assessments),
    Rest.delete('assessment', Assessments)
)
    .before(extractToken, verifyAndDecodeToken)
    .doc({
        tags: ['Assessment']
    })
