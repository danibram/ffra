import { GeneralError, NotFound, Conflict, BadRequest } from '@ffra/errors'
import * as debug from 'debug'

const deb = debug('service-mongoose')

export const errorHandler = (err, reject?) => {
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
                break;

            default:
                break;
        }
    } else {
        error = new GeneralError(err)
    }

    if (reject){
        return reject(error)
    } else {
        throw error
    }
}

// Methods

export const findOne = (model, query) => new Promise((resolve, reject) => {
        model
            .findOne(query)
            .exec()
            .then(data => {
                if (!data) {
                    reject(
                        new NotFound(`No record of ${model.modelName} found for id '${JSON.stringify(query)}'`)
                    )
                }
                resolve(data)
            }, e => errorHandler(e, reject))
            .catch(errorHandler)
    })

export const find = function (model, query= {}, limit= 100, skip= 0, count= false, sort= {}) {
    return new Promise((resolve, reject) => {
        let q = model
            .find(query)
            .skip(skip)
            .limit(limit)
            .sort(sort)

        const executeQuery = (total?) => q.exec()
            .then(data => {
                resolve({
                    metadata: {total, skip, limit, sort},
                    data
                })
            },
            reject)
            .catch(errorHandler)

        if (count) {
            return model
                .where(query)
                .count()
                .exec()
                .then(executeQuery);
        }

        return executeQuery()

    })
}

export const create = function (model, data) {
    return new Promise((resolve, reject) => {

        model.create(data)
            .then(resolve, reject)
            .catch((err) => errorHandler(err, reject));
    })

}

export const update = function (model, query, data, options= {}) {
    return new Promise((resolve, reject) => {

        const opts = Object.assign({
            new: true,
            overwrite: false,
            runValidators: true,
            context: 'query',
            setDefaultsOnInsert: true
        }, options);

        model.findOneAndUpdate(query, data, opts)
            .exec()
            .then(resolve, reject)
            .catch((e) => errorHandler(e, reject))
    })
}

export const del = function (model, query) {
    return new Promise((resolve, reject) => {
        model
            .findOne(query)
            .exec()
            .then(data => {
                if (!data) {
                    reject(
                        new NotFound(`No record of ${model.modelName} found for id '${JSON.stringify(query)}'`)
                    )
                }
                model
                    .remove(query)
                    .exec()
                    .then(() => resolve(data), reject)
                    .catch((e) => errorHandler(e, reject))
            }, reject)
            .catch((e) => errorHandler(e, reject))
    })
}
