import { group, GET } from '@ffra/route-designer'
import Rest from '@ffra/koa-rest-mongoose'
import { verifyAndDecodeToken, populateAuthUser } from '../../hooks'
import { composeConfig } from './config.methods'
export default group(GET('config', composeConfig)).doc({ tags: ['Config'] })
