import { Route, Routes } from '@ffra/route-designer'
import * as debug from 'debug'
import * as fastify from 'fastify'
import * as fp from 'fastify-plugin'
import * as fs from 'fs'
import { IncomingMessage, Server, ServerResponse } from 'http'
import * as path from 'path'
import ErrorPlugin from '../errors'

const deb = debug('@ffra/fastify/register')

declare module 'fastify' {
    export interface FastifyInstance<
        HttpServer = Server,
        HttpRequest = IncomingMessage,
        HttpResponse = ServerResponse
    > {}
}
const ffra = function (fastify, options, next) {
    fastify.register(ErrorPlugin)

    fastify.decorateRequest('ctx', {
        hook: {},
        debug: null,
    })

    fs.readdirSync(options.services).forEach((f) => {
        let filepath = path.join(options.services, f)
        deb(`Loading file ${filepath}`)

        try {
            let controller = require(filepath).default

            controller =
                controller instanceof Routes || controller.export
                    ? controller.export()
                    : controller

            controller.forEach((r) => {
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
                        async (f, req, res, done) => {
                            req.ctx.debug = debug(
                                `request-${Math.random().toString().slice(2)}`
                            )

                            return
                        },
                        ...route.before,
                    ].map((fn) => fn.bind(null, fastify)),
                    handler: route.action.bind(null, fastify),
                    preSerialization: [
                        ...route.after,
                        async (f, req, res, payload) => {
                            if (req.ctx.raw) {
                                return payload
                            } else {
                                return {
                                    metadata: {
                                        ...(req.ctx.metadata
                                            ? req.ctx.metadata
                                            : {}),
                                        time: res.getResponseTime(),
                                    },
                                    data: req.ctx.hook.data
                                        ? req.ctx.hook.data
                                        : payload,
                                }
                            }
                        },
                    ].map((fn) => fn.bind(null, fastify)),
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
    name: 'fastify-ffra',
}) as fastify.Plugin<
    Server,
    IncomingMessage,
    ServerResponse,
    {
        services: string
    }
>
