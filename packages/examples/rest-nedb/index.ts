import * as config from 'config'

import app from './app'

app.listen(config.get('port'))
console.log(`App (${config.get('env')}) listening port: ${config.get('port')}`)
