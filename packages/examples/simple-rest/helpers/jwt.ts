import * as jsonwebtoken from 'jsonwebtoken'
import * as jwt from 'jsonwebtoken'
import * as config from 'config'

export const decodeToken = async function(token, secret) {
    return new Promise((resolve, reject) => {
        jsonwebtoken.verify(token, secret, {}, (err, payload) => {
            if (err) {
                return reject(err)
            }
            resolve(payload)
        })
    })
}

export const generateToken = function(user) {
    let expiry = new Date()
    expiry.setDate(
        expiry.getDate() + (config.get('auth.expirationDays') as number)
    )
    let expiration = expiry.getTime()

    return jwt.sign(
        {
            id: user.id,
            profile: user,
            exp: Math.floor(expiration / 1000)
        },
        config.get('auth.secret') as string
    )
}
