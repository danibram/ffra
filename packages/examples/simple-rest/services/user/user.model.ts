import * as mongoose from 'mongoose'
import * as crypto from 'crypto'
import * as config from 'config'

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true
        },

        recoveryToken: { type: String },
        passwordHash: { type: String },
        salt: { type: String },

        locale: { type: String },

        disciplines: { type: Array },
        bhpaLicense: { type: String },
        fullName: { type: String },
        description: { type: String },
        active: { type: Boolean },
        membershipExpirationDate: { type: Date },
        picture: { type: String },

        roles: {
            type: [
                {
                    type: String,
                    enum: ['user', 'coach', 'contributor', 'staff', 'admin']
                }
            ],
            default: 'user'
        },
        lastLogin: { type: Date }
    },
    { timestamps: true }
)

// Virtual fields
userSchema.virtual('password').set(function(password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.passwordHash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, config.get(
            'auth.digest'
        ) as string)
        .toString('hex')
})

userSchema.virtual('password').get(function() {
    return this.passwordHash
})

// Methods
userSchema.methods.checkPassword = function(password) {
    password = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, config.get(
            'auth.digest'
        ) as string)
        .toString('hex')
    return this.password === password
}

export default mongoose.model('User', userSchema)
