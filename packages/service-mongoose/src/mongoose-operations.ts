import { GeneralError, NotFound, Conflict, BadRequest } from '@ffra/errors'
import * as debug from 'debug'
const deb = debug('service-mongoose')

export const errorHandler = function(err) {
    let error

    deb(`Error ${err.name}`)

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

export const findOne = async function(model, query) {
    try {
        let data = await model.findOne(query).exec()

        if (!data) {
            throw new NotFound(
                `No record of ${model.modelName} found for id '${JSON.stringify(
                    query
                )}'`
            )
        }

        return data
    } catch (e) {
        return errorHandler(e)
    }
}

export const find = async function(
    model,
    query = {},
    limit = 100,
    skip = 0,
    count = false,
    sort = {}
) {
    let q = model
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort(sort)

    const executeQuery = async function(total?) {
        let data = await q.exec()
        return {
            metadata: { total, skip, limit, sort },
            data
        }
    }

    try {
        let P = executeQuery
        if (count) {
            let total = await model
                .where(query)
                .count()
                .exec()
            P = executeQuery.apply(null, total)
        }

        let data = await P()
        return data
    } catch (e) {
        return errorHandler(e)
    }
}

export const create = async function(model, data) {
    try {
        return model.create(data)
    } catch (err) {
        errorHandler(err)
    }
}

export const update = async function(model, query, data, options = {}) {
    try {
        const opts = Object.assign(
            {
                new: true,
                overwrite: false,
                runValidators: true,
                context: 'query',
                setDefaultsOnInsert: true
            },
            options
        )

        return model.findOneAndUpdate(query, data, opts).exec()
    } catch (err) {
        errorHandler(err)
    }
}

export const del = async function(model, query) {
    try {
        let data = await model.findOne(query).exec()
        if (!data) {
            throw new NotFound(
                `No record of ${model.modelName} found for id '${JSON.stringify(
                    query
                )}'`
            )
        }

        await model.remove(query).exec()
        return data
    } catch (err) {
        errorHandler(err)
    }
}
