import { group, GET, POST } from '@ffra/route-designer'
import Rest from '@ffra/koa-rest-mongoose'
import Translations from './translation.service'
import { cache } from './translation.methods'

export default group(
    GET('translations/cache', cache),
    Rest.find('translations', Translations),
    Rest.findOne('translations', Translations),
    Rest.create('translations', Translations),
    Rest.update('translations', Translations),
    Rest.delete('translations', Translations)
).doc({ tags: ['Translations'] })
