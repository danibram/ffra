import * as Koa from 'koa'
import * as cors from '@koa/cors'
import * as bodyParser from 'koa-bodyparser'
import * as koaRouter from 'koa-router'
import * as path from 'path'
import * as pino from 'pino'
import * as config from 'config'

import { errorHandlerKoa } from '@ffra/error-handler-koa'
import { ffrun } from '@ffra/autorun'

const koaLogger = require('koa-pino-logger')
const logger = pino(config.get('log'))

const servicesPath = path.resolve(__dirname, 'services')
const fallbackPath = path.resolve(__dirname, '..', 'public')

let app = new Koa()
let router = ffrun({
    router: new koaRouter(),
    logger,
    servicePath: servicesPath,
    fallbackServe: fallbackPath
})

app
    .use(koaLogger(logger))
    .use(
        errorHandlerKoa({
            deleteStackWhen: config.get('env') === 'production',
            log: logger
        })
    )
    .use(router.routes())

export default app
