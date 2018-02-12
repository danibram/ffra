import { group, GET, POST } from '@ffra/route-designer'
import Rest from '@ffra/koa-rest-mongoose'
import Modules from './module.service'
import { verifyAndDecodeToken, extractToken } from '../../hooks/auth'

export default group(
    Rest.find('modules', Modules),
    Rest.findOne('modules', Modules),
    Rest.create('modules', Modules),
    Rest.update('modules', Modules),
    Rest.delete('modules', Modules)
)
    .before(extractToken, verifyAndDecodeToken)
    .doc({ tags: ['Modules'] })
