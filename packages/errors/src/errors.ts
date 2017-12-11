export class APIError extends Error {
    name: string = ''
    message: string = ''
    statusCode: number
    data: string = ''
    stack?: any
    errors?: any

    constructor(
        msg: string | Error,
        name: string,
        statusCode: number,
        data: any
    ) {
        super(msg as any)
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, APIError.prototype)

        this.name = name
        this.message =
            (msg as any) instanceof Error
                ? (msg as any).message || 'Error'
                : typeof msg === 'object' ? msg.message || 'Error' : msg

        this.statusCode = statusCode
        this.data = data
        this.stack = Error.captureStackTrace
            ? Error.captureStackTrace(this, APIError)
            : new Error().stack
        this.errors = {}
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            statusCode: this.statusCode,
            data: this.data,
            stack: this.stack
        }
    }
}

export class BadRequest extends APIError {
    constructor(message, data?) {
        super(message, 'BadRequest', 400, data)
    }
}

export class NotAuthenticated extends APIError {
    constructor(message, data?) {
        super(message, 'NotAuthenticated', 401, data)
    }
}

export class PaymentError extends APIError {
    constructor(message, data?) {
        super(message, 'PaymentError', 402, data)
    }
}

export class Forbidden extends APIError {
    constructor(message, data?) {
        super(message, 'Forbidden', 403, data)
    }
}

export class NotFound extends APIError {
    constructor(message, data?) {
        super(message, 'NotFound', 404, data)
    }
}

export class MethodNotAllowed extends APIError {
    constructor(message, data?) {
        super(message, 'MethodNotAllowed', 405, data)
    }
}

export class NotAcceptable extends APIError {
    constructor(message, data?) {
        super(message, 'NotAcceptable', 406, data)
    }
}

export class Timeout extends APIError {
    constructor(message, data?) {
        super(message, 'Timeout', 408, data)
    }
}

export class Conflict extends APIError {
    constructor(message, data?) {
        super(message, 'Conflict', 409, data)
    }
}

export class Unprocessable extends APIError {
    constructor(message, data?) {
        super(message, 'Unprocessable', 422, data)
    }
}

export class GeneralError extends APIError {
    constructor(message, data?) {
        super(message, 'GeneralError', 500, data)
    }
}

export class NotImplemented extends APIError {
    constructor(message, data?) {
        super(message, 'NotImplemented', 501, data)
    }
}

export class Unavailable extends APIError {
    constructor(message, data?) {
        super(message, 'Unavailable', 503, data)
    }
}

export class Validation extends APIError {
    constructor(message, data?) {
        super(message, 'Validation', 400, data)
    }
}
