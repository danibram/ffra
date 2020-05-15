import { BadRequest, Conflict, GeneralError, NotFound } from '@ffra/errors'
import * as debug from 'debug'
const deb = debug('@ffra/service-mongoose')

export const errorHandler = function (err) {
    let error

    if (err.name) {
        switch (err.name) {
            case 'ValidationError':
            case 'ValidatorError':
            case 'CastError':
            case 'TypeError':
            case 'VersionError':
            case 'BadRequest':
                error = new BadRequest(err, err.errors)
                break
            case 'OverwriteModelError':
                error = new Conflict(err)
                break
            case 'MissingSchemaError':
            case 'DivergentArrayError':
                error = new GeneralError(err)
                break
            case 'MongoError':
                if (err.code === 11000) {
                    error = new Conflict(err)
                }
                break

            default:
                break
        }
    } else {
        error = new GeneralError(err)
    }

    throw error
}

// Methods

export const findOne = async function (model, query) {
    let data

    query = typeof query === 'string' ? { _id: query } : query

    try {
        data = await model.findOne(query).exec()
    } catch (e) {
        return errorHandler(e)
    }

    if (!data) {
        throw new NotFound(
            `No record of ${model.modelName} found for '${JSON.stringify(
                query
            )}'`
        )
    }

    return data
}

export const find = async function (
    model,
    query = {},
    limit?: number,
    skip?: number,
    count?: boolean,
    sort?: { [key: string]: number },
    opts?
) {
    let q = model.find(query)

    q = skip || skip !== 0 ? q.skip(skip) : q

    q = limit ? q.limit(limit) : q

    q = sort ? q.sort(sort) : q

    if (opts && opts.populates) {
        opts.populates.forEach((pfield) => {
            q = q.populate(pfield)
        })
    }

    const executeQuery = async function (total?) {
        let data = await q.exec()
        return {
            metadata: { total, skip, limit, sort },
            data,
        }
    }

    try {
        let P = executeQuery
        if (count) {
            let total = await model.where(query).count().exec()
            P = executeQuery.apply(null, total)
        }

        let data = await P()
        return data
    } catch (e) {
        return errorHandler(e)
    }
}

export const create = async function (model, data) {
    try {
        return await model.create(data)
    } catch (err) {
        return errorHandler(err)
    }
}

export const update = async function (model, query, data, options = {}) {
    const opts = Object.assign(
        {
            new: true,
            overwrite: false,
            runValidators: true,
            context: 'query',
            setDefaultsOnInsert: true,
            useFindAndModify: true,
        },
        options
    )

    query = typeof query === 'string' ? { _id: query } : query

    try {
        return await model.findOneAndUpdate(query, data, opts).exec()
    } catch (err) {
        return errorHandler(err)
    }
}

export const del = async function (model, query) {
    let data

    query = typeof query === 'string' ? { _id: query } : query

    try {
        data = await model.findOne(query).exec()
    } catch (err) {
        return errorHandler(err)
    }

    if (!data) {
        throw new NotFound(
            `No record of ${model.modelName} found for id '${JSON.stringify(
                query
            )}'`
        )
    }

    try {
        await model.remove(query).exec()
    } catch (err) {
        return errorHandler(err)
    }

    return data
}
