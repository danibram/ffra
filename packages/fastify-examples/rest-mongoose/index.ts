import mongoConnector from '@ffra/mongoose-reconnector'
import * as config from 'config'
import start from './app'
import logger from './logger'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

process.on('uncaughtException', error => {
    logger.error(error)
})
process.on('unhandledRejection', error => {
    logger.error(error)
})

mongoConnector({
    logger,
    uri: config.get('db.uri'),
    options: config.get('db.options'),
    mongoose
}).then(() => {
    start(config.get('port'))
})
