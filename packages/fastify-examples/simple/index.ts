import * as config from 'config'
import start, { logger } from './app'

process.on('uncaughtException', error => {
    logger.error(error)
})
process.on('unhandledRejection', error => {
    logger.error(error)
})

start(config.get('port'))
