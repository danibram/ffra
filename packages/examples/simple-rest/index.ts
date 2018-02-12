import * as config from 'config'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

import mongoConnector from '@ffra/mongoose-reconnector'

import app from './app'

const log = (app as any).log

mongoConnector({
    logger: log,
    uri: config.get('db.uri'),
    options: config.get('db.options'),
    mongoose
}).then(() => {
    app.listen(config.get('port'))
    log.info(`App (${config.get('env')}) listening port: ${config.get('port')}`)
})
