export const populator = ({ name, service }) =>
    async function(ctx, next) {
        const populate = ctx.query.populate ? ctx.query.populate.split(',') : []

        let populateFN = (object, name, svc) => {
            if (object.hasOwnProperty(name)) {
                return svc.findOne(object[name]).then(populated => {
                    object[name] = svc.output(populated)
                    return object
                }, console.error)
            }

            return Promise.resolve(object)
        }

        if (
            ctx.hook.data &&
            Array.isArray(populate) &&
            populate.indexOf(name) > -1
        ) {
            if (Array.isArray(ctx.hook.data)) {
                let promises = ctx.hook.data.map(data =>
                    populateFN(data, name, service)
                )
                ctx.hook.data = await Promise.all(promises).catch(err =>
                    console.error(err)
                )
            } else {
                ctx.hook.data = await populateFN(ctx.hook.data, name, service)
            }
        }

        ctx.debug('populated')

        await next()
    }
