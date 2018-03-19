import { group, GET, POST } from '@ffra/route-designer'
import Rest from '@ffra/koa-rest-mongoose'
import Cats from './cat.service'

export default group(
    Rest.find('cats', Cats),
    Rest.findOne('cats', Cats),
    Rest.create('cats', Cats),
    Rest.update('cats', Cats),
    Rest.delete('cats', Cats)
).doc({ tags: ['User'] })
