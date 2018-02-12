import { group, GET, POST } from '@ffra/route-designer'
import Rest from '@ffra/koa-rest-mongoose'
import Pages from './page.service'
import { postImages, deleteImages } from './page.methods'
import {
    verifyAndDecodeToken,
    populateAuthUser,
    authenticated
} from '../../hooks'

export default group(
    POST('pages/images', postImages),
    POST('pages/images/delete', deleteImages),

    Rest.find('pages', Pages),
    Rest.findOne('pages', Pages),
    Rest.create('pages', Pages),
    Rest.update('pages', Pages),
    Rest.delete('pages', Pages)
)
    .before(verifyAndDecodeToken, populateAuthUser)
    .doc({ tags: ['Page'] })
