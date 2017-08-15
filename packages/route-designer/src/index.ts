export interface IRoute {
    version: string,
    path: string
    verb: string
    action: Function
    after: Function[]
    before: Function[]
    doc: any
}

export class Route {

    route: IRoute = {
        version: 'v1',
        path: '',
        verb: '',
        action: () => {},
        after: [],
        before: [],
        doc: {}
    }

    constructor({version= 'v1', verb, path, action, doc= {}}) {
        this.route = Object.assign({}, this.route, {
            version,
            verb,
            path,
            action,
            doc
        })
        return this
    }

    after(...hooks) {
        this.route.after = hooks.concat(this.route.after)
        return this
    }

    before(...hooks) {
        this.route.before = hooks.concat(this.route.before)
        return this
    }

    version(v){
        this.route.version = v
        return this
    }

    doc(doc){
        this.route.doc = doc
        return this
    }

    setDoc(key, value){
        this.route.doc[key] = value
        return this
    }

    compose() {
        return this.route
    }
}

export class Routes {
    routes: Route[]

    constructor(...routes){
        this.routes = routes
        return this
    }

    after(...hooks){
        this.routes.forEach(r => r.after(...hooks) )
        return this
    }

    before(...hooks){
        this.routes.forEach(r => r.before(...hooks) )
        return this
    }

    version(v){
        this.routes.forEach(r => r.version(v) )
        return this
    }

    doc(doc){
        this.routes.forEach(r => {
            let keys = Object.keys(doc)
            keys.forEach(k => {
               r.setDoc(k, doc[k])
            })
        })
        return this
    }

    add(...routes){
        routes.forEach(route => this.routes.push(route))
        return this
    }

    export(){
        return this.routes
    }
}


export const GET = function(path, action){
    return new Route({
        verb: 'get',
        path,
        action
    })
}

export const POST = function(path, action){
    return new Route({
        verb: 'post',
        path,
        action
    })
}

export const PUT = function(path, action){
    return new Route({
        verb: 'put',
        path,
        action
    })
}

export const DELETE = function(path, action){
    return new Route({
        verb: 'delete',
        path,
        action
    })
}

export const group = function (...routes){
    return new Routes(...routes)
}
