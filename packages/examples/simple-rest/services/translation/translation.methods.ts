import * as config from 'config'
import Translations from './translation.service'

export const cache = async function(ctx, next) {
    let translations = {}
    let locales = ctx.query.locale
        ? ctx.query.locale.split(',')
        : config.get('locales')

    let q = {}
    if (ctx.query.domain) {
        q['$or'] = []
        q['$or'].push({ domain: ctx.query.domain })
        q['$or'].push({ domain: 'global' })
    }

    let { data } = await Translations.find(q)

    if (locales.length > 1) {
        locales.forEach(locale => {
            data.forEach(t => {
                if (!translations[locale]) {
                    translations[locale] = {}
                }
                translations[locale][t.key] = t.translations[locale]
            })
        })
    } else {
        data.forEach(t => {
            translations[t.key] = t.translations[locales[0]]
        })
    }

    ctx.hook.data = translations
    next()
}
