import * as Koa from 'koa'
import * as cors from '@koa/cors'
import * as bodyParser from 'koa-bodyparser'
import * as koaRouter from 'koa-router'
import * as serve from 'koa-static'
import * as path from 'path'
import * as pino from 'pino'
import * as config from 'config'

import {
    composeRoutesFromServices,
    composeEntitiesFromServices,
    connectWithKoaRouter,
    connectDocsWithKoaRouter
} from '@ffra/autorun'
import { errorHandlerKoa } from '@ffra/error-handler-koa'

const koaLogger = require('koa-pino-logger')
const koaQS = require('koa-qs')
const logger = pino(config.get('log'))

const dir = path.resolve(__dirname, 'services')
const Pdir = path.resolve(__dirname, '..', 'public')

let app = new Koa()
let router = new koaRouter()
let routes = composeRoutesFromServices(dir)

connectWithKoaRouter({
    routes,
    router,
    log: logger
})

connectDocsWithKoaRouter({
    routes,
    router,
    definitions: composeEntitiesFromServices(dir)
})

router.get('/*', serve(path.resolve(Pdir)))

app.keys = ['secret', 'key']

koaQS(app, 'extended')
    .use(cors({ credentials: true }))
    .use(bodyParser())
    .use(koaLogger(logger))

    .use(
        errorHandlerKoa({
            deleteStackWhen: config.get('env') === 'production',
            log: logger
        })
    )

    .use(router.routes())

app.on('error', function(err) {
    logger.error(err)
})

app['log'] = logger

export default app
