import { group, GET, POST } from '@ffra/route-designer'

import { cache, render, send } from './mailer.methods'

export default group(
    GET('mailer/cache', cache),
    GET('mailer/render/:tmp', render),
    POST('mailer/send', send)
).doc({ tags: ['Mailer'] })
