# FFRA integration with Koa

This modules group some functionality written here:

-   `https://www.npmjs.com/package/@ffra/swagger`
-   `https://www.npmjs.com/package/@ffra/koa-rest-mongoose`
-   `https://www.npmjs.com/package/@ffra/error-handler-koa`
-   `https://www.npmjs.com/package/@ffra/autorun``

## Why

Because I want to expand the compatibility with more framework, and I think is better to group up by framework

## Incompatibilities

The only one are error-handler-koa, that now you have to use like:

```
import errorHandlerKoa from '@ffra/koa/error-handler'
```

The rest are the same modules exposed here:

-   `@ffra/swagger` -> `@ffra/koa/swagger`
-   `@ffra/koa-rest-mongoose` -> `@ffra/koa/rest`
-   `@ffra/error-handler-koa` -> `@ffra/koa/error-handler`
-   `@ffra/autorun` -> `@ffra/koa`
