import { group, GET } from '@ffra/route-designer'

import { getMe, verifyAndDecodeToken, extractToken } from '../../hooks/auth'
import { composeShield, composeShieldModuleLayer } from './shield.methods'

export default group(
    GET('shield', composeShield),
    GET('shield/module/:moduleId/layer/:layerId', composeShieldModuleLayer)
)
    .before(extractToken, verifyAndDecodeToken)
    .doc({ tags: ['Shield (Test)'] })
