import * as config from 'config'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

import mongoConnector from '@ffra/mongoose-reconnector'

import app from './app'

mongoConnector({
    logger: console,
    uri: config.get('db.uri'),
    options: config.get('db.options'),
    mongoose
}).then(() => {
    app.listen(config.get('port'))
    console.log(
        `App (${config.get('env')}) listening port: ${config.get('port')}`
    )
})
