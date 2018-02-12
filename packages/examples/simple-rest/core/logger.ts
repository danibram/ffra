import * as pino from 'pino'
import * as config from 'config'

export const logger = pino(config.get('log'))
