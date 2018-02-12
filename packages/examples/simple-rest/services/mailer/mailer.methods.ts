import mailer from '../../core/Mailer'

export const cache = async function(ctx, next) {
    mailer.cacheEmails()
    ctx.hook.data = 'OK'
    next()
}

export const render = async function(ctx, next) {
    let emailTemplate = ctx.params.tmp

    mailer.cacheEmails()

    let { html, subject } = await mailer.renderTemplate(emailTemplate)

    ctx.body = html
}

export const send = async function(ctx, next) {
    let { template, data, email } = ctx.request.body

    let { html, subject } = await mailer.renderTemplate(template, data)

    await mailer.sendEmail({
        from: 'info@bhpa-project.io',
        to: email,
        subject,
        html
    })

    ctx.hook.data = 'OK'
    next()
}
