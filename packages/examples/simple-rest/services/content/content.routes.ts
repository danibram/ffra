import { group, GET, POST } from '@ffra/route-designer'
import Rest from '@ffra/koa-rest-mongoose'
import Contents from './content.service'
import { publishContent, postImages, deleteImages, renameContentSkill } from './content.methods'
import {
    extractToken,
    verifyAndDecodeToken,
    populateAuthUser,
    authenticated
} from '../../hooks'
import { checkIfPublished } from './content.hooks'

export default group(
    POST('contents/images', postImages),
    POST('contents/images/delete', deleteImages),
    POST('contents/rename-skill', renameContentSkill),

    Rest.find('contents', Contents),
    Rest.findOne('contents', Contents),
    Rest.create('contents', Contents),
    Rest.update('contents', Contents),
    Rest.delete('contents', Contents),

    POST(
        'contents/:old_version/:new_version/:operation',
        publishContent
    ).before(checkIfPublished, authenticated)
)
    .before(extractToken, verifyAndDecodeToken, populateAuthUser)
    .doc({ tags: ['Content'] })
