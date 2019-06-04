import { APIError, GeneralError } from '@ffra/errors'

export const errorHandlerKoa = ({ deleteStackWhen, log }) => async (
    ctx,
    next
) => {
    try {
        await next()
    } catch (error) {
        log.error(error)

        if (!(error instanceof APIError)) {
            let oldError = error
            error = new GeneralError(
                oldError,
                oldError && oldError.errors
                    ? {
                          errors: oldError.errors
                      }
                    : {}
            )
        }

        error.statusCode = !isNaN(parseInt(error.statusCode, 10))
            ? parseInt(error.statusCode, 10)
            : 500

        if (error.toJSON) {
            error = error.toJSON()
        }

        if (deleteStackWhen && error.stack) {
            delete error.stack
        }

        ctx.body = error
        ctx.status = error.statusCode || 500
    }
}
