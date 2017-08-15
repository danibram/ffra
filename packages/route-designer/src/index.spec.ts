import { test } from 'ava'
import { GET,POST,PUT,DELETE,group,Route,Routes } from './'

test('GET definition', (t) => {
    let route = GET('hello', ()=>({}))
    t.true(route instanceof Route)
})

test('POST definition', (t) => {
    let route = POST('hello', ()=>({}))
    t.true(route instanceof Route)
})

test('PUT definition', (t) => {
    let route = PUT('hello', ()=>({}))
    t.true(route instanceof Route)
})

test('DELETE definition', (t) => {
    let route = DELETE('hello', ()=>({}))
    t.true(route instanceof Route)
})