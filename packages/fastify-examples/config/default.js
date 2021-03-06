module.exports = {
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
    log: {
        name: 'TEST',
        level: 'trace'
    },
    env: 'development'
}
