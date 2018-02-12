import { group, GET, POST } from '@ffra/route-designer'
import Rest from '@ffra/koa-rest-mongoose'
import Skills from './skill.service'
import {
    verifyAndDecodeToken,
    extractToken,
    populateAuthUser
} from '../../hooks/auth'
import { details, content } from './skill.methods'
import { populator } from '../../hooks/populator'
import { Users } from '../user'

export default group(
    Rest.find('skills', Skills).after(
        populator({ name: 'curator', service: Users })
    ),
    Rest.findOne('skills', Skills).after(
        populator({ name: 'curator', service: Users })
    ),
    Rest.create('skills', Skills).after(
        populator({ name: 'curator', service: Users })
    ),
    Rest.update('skills', Skills).after(
        populator({ name: 'curator', service: Users })
    ),
    Rest.delete('skills', Skills),

    GET('skills/:id/details', details),
    GET('skills/:id/content', content)
)
    .before(extractToken, verifyAndDecodeToken, populateAuthUser)
    .doc({ tags: ['Skill'] })
