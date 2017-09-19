import { test } from 'ava'
import { Route } from '@ffra/route-designer'

import Rest from './'

test('Rest find definition', (t) => {
    t.true( Rest.find('test', ()=>({}) ) instanceof Route)
})
