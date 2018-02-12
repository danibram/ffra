const path = require('path')
const templatesPath = 'templates'

module.exports = {
    frontEnd: 'http://localhost:3000',
    hostname: 'http://localhost:3001',
    port: 3001,
    host: 'localhost',
    db: {
        uri: 'mongodb://admin:admin@ds111608.mlab.com:11608/test-ffra',
        options: {
            socketTimeoutMS: 0,
            keepAlive: true,
            reconnectTries: 30
        }
    },
    filesystem: {
        tmp: path.resolve('tmp'),
        images: path.resolve('public/images')
    },
    imagesEndpoint: '',
    locales: ['en_uk', 'es_es'],
    log: {
        name: 'BHPA-API',
        level: 'trace'
    },
    env: 'development'
}
