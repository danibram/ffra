import { group, GET, POST } from '@ffra/route-designer'
import Rest from '@ffra/koa-rest-mongoose'

import Audit from './audit.service'
import { verifyAndDecodeToken, extractToken } from '../../hooks/auth'

export default group(Rest.find('audits', Audit))
    .before(extractToken, verifyAndDecodeToken)
    .doc({ tags: ['Audit'] })
