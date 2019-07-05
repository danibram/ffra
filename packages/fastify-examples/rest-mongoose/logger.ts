import * as pino from 'pino'

export default pino({
    level: 'info',
    prettyPrint: { colorize: true, translateTime: true }
})
