import { generateDoc } from '@ffra/koa/swagger'
import { IRoute } from '@ffra/route-designer'
import { finalHook, initialHook } from './hooks'

type koaMiddleware =
    | ((ctx: any, next: any) => Promise<void>)
    | ((ctx: any, next: any) => Promise<void>)[]

export const connectWithKoaRouter = ({
    routes,
    router,
    firstHook = initialHook,
    lastHook = finalHook,
    log = { info: console.log }
}) => {
    routes.forEach((r: IRoute) => {
        log && log.info(` [${r.verb.toUpperCase()}] /${r.version}/${r.path}`)

        let before = r.before as koaMiddleware
        let action = r.action as koaMiddleware
        let after = r.after as koaMiddleware

        let hooks = [firstHook].concat(before, action, after, lastHook)
        router[r.verb](`/${r.version}/${r.path}`, ...hooks)
    })

    return router
}

export const connectDocsWithKoaRouter = ({
    routes,
    router,
    definitions,
    route = 'docs',
    apiUrl = '',
    info = {}
}) =>
    generateDoc(
        router,
        routes,
        {
            basePath: '/',
            info: Object.assign(
                {
                    title: '',
                    description: '',
                    version: ''
                },
                info
            ),
            definitions
        },
        {
            docsPath: route,
            apiUrl
        }
    )
