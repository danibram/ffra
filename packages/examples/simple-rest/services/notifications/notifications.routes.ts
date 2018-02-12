import { group, GET, POST } from '@ffra/route-designer'
import Rest from '@ffra/koa-rest-mongoose'
import Model from './notifications.service'
import { verifyAndDecodeToken, extractToken } from '../../hooks/auth'
import { markReadNotification } from './notifications.methods'

export default group(
    Rest.find('notifications', Model),
    Rest.create('notifications', Model),
    Rest.update('notifications', Model),

    POST('notifications/:id/read', markReadNotification)
)
    .before(extractToken, verifyAndDecodeToken)
    .doc({ tags: ['Notifications'] })
