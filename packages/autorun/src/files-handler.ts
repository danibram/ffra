import { Route, Routes } from '@ffra/route-designer'
import * as debug from 'debug'
import * as fs from 'fs'
import * as path from 'path'
import { memoize } from 'ramda'

const deb = debug('@ffra/autorun')

export const cRoutesFromServices = servicesPath => {
    let routes: any[] = []

    fs.readdirSync(servicesPath).forEach(f => {
        let filepath = path.join(servicesPath, f)
        deb(`Loading file ${filepath}`)

        try {
            let controller = require(filepath).default

            controller =
                controller instanceof Routes || controller.export
                    ? controller.export()
                    : controller
            controller.forEach(r => {
                let route = r instanceof Route || r.export ? r.export() : r

                routes.push(route)
                deb(` - route ${route.verb} ${route.path}`)
            })
        } catch (e) {
            console.error(`Error Loading ${filepath}: ${e}`)
            console.error(e.stack)
        }
    })

    return routes
}

export const cEntitiesFromServices = servicesPath => {
    let definitions = {}

    fs.readdirSync(servicesPath).forEach(f => {
        let filepath = path.join(servicesPath, f, f + '.swagger')

        if (!fs.existsSync(`${filepath}.ts`)) {
            console.warn(`Swagger definition ${filepath} not exist`)
            return
        }

        try {
            let swagger = require(filepath).default
            definitions = Object.assign(definitions, swagger)
        } catch (e) {
            console.error(`Error Loading Definition ${filepath}: ${e}`)
        }
    })

    return definitions
}

export const composeRoutesFromServices = memoize(cRoutesFromServices)
export const composeEntitiesFromServices = memoize(cEntitiesFromServices)
