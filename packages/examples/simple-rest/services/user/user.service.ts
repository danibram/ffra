import Service from '@ffra/service-mongoose'
import UserModel from './user.model'

import * as config from 'config'

class Users extends Service {
    constructor(model) {
        super('Users', model)
    }

    parseImage(image) {
        if (image) {
            return `${config.get('imagesEndpoint')}/profile/${image}`
        }
        return `${config.get('hostname')}/img/default_avatar.png`
    }

    _output = user => {
        user = user.toObject()

        user.id = user._id
        delete user._id
        delete user.__v

        user.picture = this.parseImage(user.picture)

        delete user.passwordHash
        delete user.salt

        return user
    }
}

export default new Users(UserModel)
