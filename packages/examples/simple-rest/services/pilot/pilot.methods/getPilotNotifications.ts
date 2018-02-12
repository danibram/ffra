import { Notifications } from '../../notifications'
import { Audits } from '../../audit'
import { Skills } from '../../skill'

export const getPilotNotifications = async function(ctx, next) {
    let userId = ctx.params.userId

    await Notifications.syncNotifications(userId)

    let notifications = await Notifications.find(
        {
            userId
        },
        null,
        null,
        null,
        { createdAt: -1 }
    )

    ctx.hook.data = Notifications.output(notifications.data)
    next()
}
