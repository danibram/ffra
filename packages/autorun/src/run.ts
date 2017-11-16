import { composeRoutesFromServices, composeEntitiesFromServices } from './files-handler'
import { connectWithKoaRouter, connectDocsWithKoaRouter } from './router'
import * as path from 'path'

export const ffrun = ({ router, logger, servicePath, withKoa, withDocs, fallbackServe }: {router: any, logger: any, servicePath: string, withKoa?: boolean, withDocs?: boolean, fallbackServe?: string }) => {

    let routes = composeRoutesFromServices(servicePath)

    connectWithKoaRouter({
        routes: composeRoutesFromServices(servicePath),
        router,
        log: logger
    })

    connectDocsWithKoaRouter({
        routes: composeRoutesFromServices(servicePath),
        router,
        definitions: composeEntitiesFromServices(servicePath)
    })

    if (fallbackServe) {
        router.get('/*', fallbackServe)
    }

    return router
}