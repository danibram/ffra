import ffraPlugin from '@ffra/fastify'
import * as server from 'fastify'
import prettyRoutes from 'fastify-blipp-log'
import * as helmet from 'fastify-helmet'
import * as oas from 'fastify-oas'
import * as fastStatic from 'fastify-static'
import * as http from 'http'
import { IncomingMessage, Server, ServerResponse } from 'http'
import * as path from 'path'
import * as qs from 'querystringparser'
import logger from './logger'

const servicesPath = path.resolve(__dirname, 'services')
const fallbackPath = path.resolve(__dirname, '..', 'public')

declare module 'fastify' {
    export interface FastifyInstance<
        HttpServer = http.Server,
        HttpRequest = http.IncomingMessage,
        HttpResponse = http.ServerResponse
    > {}
}

let fastify: server.FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse
> = server({ logger, querystringParser: str => qs.parse(str) as any })

fastify.register(helmet)
fastify.register(prettyRoutes)

fastify.register(oas, {
    routePrefix: '/__api_spec',
    swagger: {
        info: {
            title: 'BSS MMO API Doc',
            description: 'Api spec for mmo',
            version: '1.0.0'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        host: process.env.VIRTUAL_HOST,
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [],
        securityDefinitions: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    exposeRoute: true
})

fastify.register(ffraPlugin, {
    services: servicesPath
})

fastify.register(fastStatic, {
    root: fallbackPath
})

export default async port => {
    try {
        await fastify.ready()

        await fastify.listen(port, '0.0.0.0')

        fastify.prettyPrintRoutes()
    } catch (err) {
        logger.error(err)
        process.exit(1)
    }
}
