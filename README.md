# fast-framework-rest-api

## Set of utils to create fast apis with auto documentation

### Comming soon

| Package                                                  | Version                                                                                                                                           | Description                                                                                          | Type              |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------- |
| [`errors`](/packages/errors)                             | [![npm](https://img.shields.io/npm/v/@ffra/errors.svg?style=flat-square)](https://www.npmjs.com/package/@ffra/errors)                             | Common HTTP errors extendeing JS native Error                                                        | Generalist        |
| [`mongoose-reconnector`](/packages/mongoose-reconnector) | [![npm](https://img.shields.io/npm/v/@ffra/mongoose-reconnector.svg?style=flat-square)](https://www.npmjs.com/package/@ffra/mongoose-reconnector) | Mongoose reconector manager                                                                          | Generalist        |
| [`route-designer`](/packages/route-designer)             | [![npm](https://img.shields.io/npm/v/@ffra/route-designer.svg?style=flat-square)](https://www.npmjs.com/package/@ffra/route-designer)             | Router to define routes in a functional style                                                        | Generalist        |
| [`service-mongoose`](/packages/service-mongoose)         | [![npm](https://img.shields.io/npm/v/@ffra/service-mongoose.svg?style=flat-square)](https://www.npmjs.com/package/@ffra/service-mongoose)         | Mongoose Service for architectural definition of services with mongoose                              | Generalist        |
| [`service-nedb`](/packages/service-nedb)                 | [![npm](https://img.shields.io/npm/v/@ffra/service-nedb.svg?style=flat-square)](https://www.npmjs.com/package/@ffra/service-nedb)                 | Nedb Service for architectural definition of services with nedb                                      | Generalist        |
| [`service`](/packages/service)                           | [![npm](https://img.shields.io/npm/v/@ffra/service.svg?style=flat-square)](https://www.npmjs.com/package/@ffra/service)                           | General service that are extend from the other services                                              | Generalist        |
| [`koa`](/packages/koa)                                   | [![npm](https://img.shields.io/npm/v/@ffra/koa.svg?style=flat-square)](https://www.npmjs.com/package/@ffra/koa)                                   | All koa integration                                                                                  | Koa dependant     |
| [`fastify`](/packages/fastify)                           | [![npm](https://img.shields.io/npm/v/@ffra/fastify.svg?style=flat-square)](https://www.npmjs.com/package/@ffra/fastify)                           | All fastify integration                                                                              | Fastify dependant |
| DEPRECATED PACKAGES from > 1.0                           |                                                                                                                                                   |                                                                                                      |                   |
| [`swagger`](/packages/swagger)                           | [![npm](https://img.shields.io/npm/v/@ffra/swagger.svg?style=flat-square)](https://www.npmjs.com/package/@ffra/swagger)                           | DEPRECATED: use `@ffra/koa/swagger`. Swagger helpers to write easy basic documentation Koa dependant | Koa dependant     |
| [`koa-rest-mongoose`](/packages/koa-rest-mongoose)       | [![npm](https://img.shields.io/npm/v/@ffra/koa-rest-mongoose.svg?style=flat-square)](https://www.npmjs.com/package/@ffra/koa-rest-mongoose)       | DEPRECATED: use `@ffra/koa/rest`.use Mongoose shortcuts for creating rest services                   | Koa dependant     |
| [`error-handler-koa`](/packages/error-handler-koa)       | [![npm](https://img.shields.io/npm/v/@ffra/error-handler-koa.svg?style=flat-square)](https://www.npmjs.com/package/@ffra/error-handler-koa)       | DEPRECATED: use `@ffra/koa/error-handler`.use General Error Handler for koa                          | Koa dependant     |
| [`autorun`](/packages/autorun)                           | [![npm](https://img.shields.io/npm/v/@ffra/autorun.svg?style=flat-square)](https://www.npmjs.com/package/@ffra/autorun)                           | DEPRECATED: use `@ffra/koa/register` or `@ffra/koa`.use Autorun function for easy start              | Koa dependant     |

### Examples

There are 2 integrations koa and fastify :

-   [`koa`](/packages/koa-examples) :
    -   [`Simple`](/packages/koa-examples/simple): run `yarn run simple`
    -   [`Rest-mongoose`](/packages/koa-examples/mongoose): run `yarn run mongoose`
-   [`fastify`](/packages/fastify-examples)
    -   [`Nedb`](/packages/koa-examples/simple): run `yarn run nedb`
    -   [`Rest-mongoose`](/packages/koa-examples/mongoose): run `yarn run mongoose`
