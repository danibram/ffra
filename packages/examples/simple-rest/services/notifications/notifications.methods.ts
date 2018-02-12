import { Notifications } from './'

export const markReadNotification = async function(ctx, next) {
    let _id = ctx.params.id

    let notification = await Notifications.findOne({ _id })

    if (notification.read === true) {
        ctx.hook.data = Notifications.output(notification)
        next()
    }

    let notificationUpdated = await Notifications.update(
        { _id },
        { read: true }
    )

    ctx.hook.data = Notifications.output(notificationUpdated)
    next()
}
