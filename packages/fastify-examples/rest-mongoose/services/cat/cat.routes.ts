import Rest from '@ffra/fastify/rest'
import { group } from '@ffra/route-designer'
import Cats from './cat.service'

export default group(
    Rest.find('cats', Cats),
    Rest.findOne('cats', Cats),
    Rest.create('cats', Cats),
    Rest.update('cats', Cats),
    Rest.delete('cats', Cats)
).doc({ tags: ['Cats'] })
