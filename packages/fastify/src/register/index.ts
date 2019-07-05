import { Route, Routes } from '@ffra/route-designer'
import * as debug from 'debug'
import * as fastify from 'fastify'
import * as fp from 'fastify-plugin'
import * as fs from 'fs'
import { IncomingMessage, Server, ServerResponse } from 'http'
import * as path from 'path'

const deb = debug('@ffra/fastify/register')

declare module 'fastify' {
    export interface FastifyInstance<
        HttpServer = Server,
        HttpRequest = IncomingMessage,
        HttpResponse = ServerResponse
    > {}
}
const ffra = function(fastify, options, next) {
    fs.readdirSync(options.services).forEach(f => {
        let filepath = path.join(options.services, f)
        deb(`Loading file ${filepath}`)

        try {
            let controller = require(filepath).default

            controller =
                controller instanceof Routes || controller.export
                    ? controller.export()
                    : controller

            controller.forEach(r => {
                let route = r instanceof Route || r.export ? r.export() : r

                fastify.route({
                    method: String(route.verb).toUpperCase(),
                    url:
                        route.version && route.version !== ''
                            ? `/${route.version}/${route.path}`
                            : `/${route.path}`,
                    schema: Object.assign({}, route.doc, route.metadata.schema),
                    attachValidation: route.metadata.schema ? true : false,
                    preHandler: [
                        async (f, req, res) => {
                            f.ctx = {}
                            return
                        },
                        ...route.after
                    ].map(fn => fn.bind(null, fastify)),
                    handler: route.action.bind(null, fastify),
                    preSerialization: (async (f, req, res, payload) => {
                        if (f.ctx.raw) {
                            return payload
                        } else {
                            return {
                                metadata: {
                                    ...(f.ctx.metadata ? f.ctx.metadata : {}),
                                    time: res.getResponseTime()
                                },
                                data: payload
                            }
                        }
                    }).bind(null, fastify)
                })

                deb(` - route ${route.verb} ${route.path}`)
            })
        } catch (e) {
            console.error(`Error Loading ${filepath}: ${e}`)
            console.error(e.stack)
        }
    })

    next()
}

export const ffraPlugin = fp(ffra, {
    name: 'fastify-ffra'
}) as fastify.Plugin<
    Server,
    IncomingMessage,
    ServerResponse,
    {
        services: string
    }
>
