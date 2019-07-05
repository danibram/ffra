import ffraPlugin from '@ffra/fastify'
import * as server from 'fastify'
import prettyRoutes from 'fastify-blipp-log'
import * as helmet from 'fastify-helmet'
import * as oas from 'fastify-oas'
import * as fastStatic from 'fastify-static'
import * as http from 'http'
import { IncomingMessage, Server, ServerResponse } from 'http'
import * as path from 'path'
import * as pino from 'pino'

const servicesPath = path.resolve(__dirname, 'services')
const fallbackPath = path.resolve(__dirname, '..', 'public')

export const logger = pino({
    level: 'info',
    prettyPrint: { colorize: true, translateTime: true }
})

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
> = server({ logger })

fastify.register(helmet)
fastify.register(prettyRoutes)

fastify.register(ffraPlugin, {
    services: servicesPath
})

fastify.register(fastStatic, {
    root: fallbackPath
})

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
        tags: [{ name: 'Cats', description: 'Cat related end-points' }],
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
