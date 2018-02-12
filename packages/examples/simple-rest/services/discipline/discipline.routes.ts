import { group, GET, POST } from '@ffra/route-designer'
import Rest from '@ffra/koa-rest-mongoose'
import Disciplines from './discipline.service'
import { verifyAndDecodeToken, extractToken } from '../../hooks/auth'

export default group(
    Rest.find('disciplines', Disciplines),
    Rest.findOne('disciplines', Disciplines),
    Rest.create('disciplines', Disciplines),
    Rest.update('disciplines', Disciplines),
    Rest.delete('disciplines', Disciplines)
)
    .before(extractToken, verifyAndDecodeToken)
    .doc({ tags: ['Discipline'] })
