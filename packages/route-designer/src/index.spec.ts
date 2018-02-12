import { test } from 'ava'
import { GET, POST, PUT, DELETE, group, Route, Routes } from './'

test('GET definition', t => {
    let route = GET('hello', () => ({}))
    t.true(route instanceof Route)
})

test('POST definition', t => {
    let route = POST('hello', () => ({}))
    t.true(route instanceof Route)
})

test('PUT definition', t => {
    let route = PUT('hello', () => ({}))
    t.true(route instanceof Route)
})

test('DELETE definition', t => {
    let route = DELETE('hello', () => ({}))
    t.true(route instanceof Route)
})

test('has export', t => {
    let route = DELETE('hello', () => ({}))
    t.notThrows(() => route.export())

    let r = route.export()
    t.deepEqual(r.version, 'v1')
    t.deepEqual(r.path, 'hello')
    t.deepEqual(r.verb, 'delete')
})

function isRoute(route: Route): route is Route {
    return <Route>route !== undefined
}

test('has export in group', t => {
    let groute = group(
        DELETE('hello', () => ({})),
        DELETE('hello', () => ({})),
        DELETE('hello', () => ({}))
    )

    t.notThrows(() => groute.export())

    let routes = groute.export()

    routes.forEach(r => {
        t.true(r instanceof Route)

        let newR = r.export()

        t.deepEqual(newR.version, 'v1')
        t.deepEqual(newR.path, 'hello')
        t.deepEqual(newR.verb, 'delete')
    })
})
