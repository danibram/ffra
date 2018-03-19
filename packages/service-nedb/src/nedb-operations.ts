import {
    GeneralError,
    NotFound,
    Conflict,
    BadRequest,
    APIError
} from '@ffra/errors'
import * as debug from 'debug'
const deb = debug('@ffra/service-nedb')

export const promisifyFn = function(model, method, ...args) {
    return new Promise((resolve, reject) => {
        deb(`Find-promisifyFn applying method ${method}`)
        model[method].apply(model, [
            ...args,
            function(error, data) {
                if (error) {
                    return reject(error)
                }

                resolve(data)
            }
        ])
    })
}

export const findOne = async function(model, query) {
    deb('FindOne-in')
    let data = await promisifyFn(model, 'findOne', query)
    deb('FindOne-out')
    if (!data) {
        throw new NotFound(
            `No record of ${model.modelName} found for '${JSON.stringify(
                query
            )}'`
        )
    }
    return data
}

export const find = async function(
    model,
    query = {},
    limit?: number,
    skip?: number,
    count?: boolean,
    sort?: { [key: string]: number }
) {
    deb('Find-in')
    let q = model.find(query)

    q = skip || skip !== 0 ? q.skip(skip) : q

    q = limit ? q.limit(limit) : q

    q = sort ? q.sort(sort) : q

    const executeQuery = async function(total?) {
        let data = await promisifyFn(q, 'exec')

        deb(`Find-executeQuery-out ${total}, ${skip}, ${limit}, ${sort}`)
        return {
            metadata: { total, skip, limit, sort },
            data
        }
    }

    try {
        let P = executeQuery
        if (count) {
            let total = await promisifyFn(model, 'count', query)
            P = executeQuery.apply(null, total)
        }
        let data = await P()
        return data
    } catch (e) {
        throw e
    }
}

export const create = async function(model, data) {
    console.log(data)
    return await promisifyFn(model, 'insert', data)
}

export const update = async function(model, query, data, options = {}) {
    const opts = Object.assign(
        {
            multi: true
        },
        options
    )

    return promisifyFn(model, 'update', query, data, opts)
}

export const del = async function(model, query) {
    let data = await promisifyFn(model, 'findOne', query)

    if (!data) {
        throw new NotFound(
            `No record of ${model.modelName} found for id '${JSON.stringify(
                query
            )}'`
        )
    }

    await promisifyFn(model, 'remove', query)

    return data
}
