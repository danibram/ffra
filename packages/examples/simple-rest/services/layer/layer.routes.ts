import { group, GET, POST } from '@ffra/route-designer'
import Rest from '@ffra/koa-rest-mongoose'
import Layers from './layer.service'
import { verifyAndDecodeToken, extractToken } from '../../hooks/auth'

export default group(
    Rest.find('layers', Layers),
    Rest.findOne('layers', Layers),
    Rest.create('layers', Layers),
    Rest.update('layers', Layers),
    Rest.delete('layers', Layers)
)
    .before(extractToken, verifyAndDecodeToken)
    .doc({ tags: ['Layer'] })
