import * as fp from 'fastify-plugin'

const fastifyErrorPage = function (fastify, options, next) {
    fastify.setErrorHandler(function errorHandler(error, request, reply) {
        if (error && error.isFFRA) {
            reply.code(error.statusCode).type('application/json').send({
                name: error.name,
                message: error.message,
                data: error.data,
            })

            return
        }

        reply.send(error || new Error('Got non-error: ' + error))
    })

    next()
}

export default fp(fastifyErrorPage, {
    fastify: '>=2.6.0',
    name: 'ffra-errors',
})
