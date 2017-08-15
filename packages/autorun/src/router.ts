import * as Router from 'koa-router'
import * as path from 'path'
import * as serve from 'koa-static'

import { IRoute } from '@ffra/route-designer'
import { generateDoc } from '@ffra/swagger'
import { readAndComposeServices, readAndComposeEntities } from './files-handler'
import { initialHook, finalHook } from './hooks'

type koaMiddleware = ((ctx: any, next: any) => Promise<void>) | ((ctx: any, next: any) => Promise<void>)[]

export const startRouter = ({ servicesPath, apiUrl, logger, swaggerRoute, folderServe, firstHook= initialHook, lastHook= finalHook, info={} }) => {
    let router = new Router()

    let routes = readAndComposeServices(servicesPath)

    routes
        .forEach((r: IRoute) => {
            logger && logger(` [${r.verb.toUpperCase()}] /${r.version}/${r.path}`)

            let before = r.before as koaMiddleware
            let action = r.action as koaMiddleware
            let after = r.after as koaMiddleware

            let hooks = [firstHook].concat(before, action, after, lastHook)
            router[r.verb](`/${r.version}/${r.path}`, ...hooks)
        })

    swaggerRoute && generateDoc(router, routes, {
        basePath: '/',
        info: Object.assign({
            title: '',
            description: '',
            version: ''
        }, info),
        definitions: readAndComposeEntities(servicesPath)
    }, {
        docsPath: swaggerRoute,
        apiUrl
    })

    folderServe && router.get('/*', serve(path.resolve(folderServe)))

    return router
}