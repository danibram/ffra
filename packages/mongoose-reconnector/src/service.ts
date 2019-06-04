export class ConnectManager {
    uri: string
    options: any
    retryTimeMs: number
    attempsLimit: number
    logger: any
    interval: any = null
    attemps: any = 0
    connected: Boolean = false
    mongoose: any
    db: any

    constructor(uri, options, logger, retryTimeMs, attempsLimit, mongoose) {
        this.mongoose = mongoose
        this.uri = uri
        this.options = Object.assign({}, options)
        this.retryTimeMs = retryTimeMs
        this.logger = logger
        this.attempsLimit = attempsLimit

        this.db = this.mongoose.connection
        this._setupEvents()
    }

    _setupEvents() {
        this.db.on('connected', ref => {
            this.connected = true
            this.logger.info(`MongoDB: Connected`)
        })

        this.db.on('disconnected', ref => {
            this.connected = false
            this.reconnect()
        })

        this.db.on('error', err => {
            this.logger.warn(`MongoDB: ${err}.`)
            this.mongoose.disconnect()
        })

        this.db.on('open', () => {
            clearInterval(this.interval)
            this.logger.info(`MongoDB: Open ${this.uri}`)
        })
    }

    connect() {
        this.mongoose.connect(this.uri, this.options).catch(err => {
            this.attemps++
            this.logger.error(`MongoDB: ${err}.`)
            this.reconnect()
        })
    }

    reconnect() {
        clearInterval(this.interval)

        if (!this.connected) {
            if (this.attemps > this.attempsLimit) {
                this.logger.error(`MongoDB: Imposible connect to the database`)
                process.exit()
                return
            }

            this.interval = setInterval(() => this.connect(), this.retryTimeMs)
        }
    }
}

export const mongoConnector = ({
    uri,
    options,
    logger = console as any,
    retryTimeMs = 5000,
    attempsLimit = 10,
    mongoose
}) =>
    new Promise((resolve, reject) => {
        let connector = new ConnectManager(
            uri,
            options,
            logger,
            retryTimeMs,
            attempsLimit,
            mongoose
        )
        connector.connect()
        mongoose.connection.once('open', resolve)
    })
