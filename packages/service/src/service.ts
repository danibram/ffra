export class Service {
    model: any
    subscribers: {
        all: any[],
        get: any[],
        find: any[],
        update: any[],
        delete: any[]
    }
    name: string
    operations: {
        findOne: Function,
        find: Function,
        create: Function,
        update: Function,
        delete: Function
    }

    constructor(Model, name, operations= {}) {
        this.model = Model
        this.name = name
        this.operations = Object.assign({}, {
            findOne: ()=>({}),
            find: ()=>({}),
            create: ()=>({}),
            update: ()=>({}),
            delete: ()=>({})
        }, operations)
    }

    async findOne(...args){
        let result = await (this.operations.findOne as any)(this.model, ...args)
        return result
    }

    async find(...args){
        let result = await (this.operations.find as any)(this.model, ...args)
        return result
    }

    async create(...args){
        let result = await (this.operations.create as any)(this.model, ...args)
        return result
    }

    async update(...args){
        let result = await (this.operations.update as any)(this.model, ...args)
        return result
    }

    async delete(...args){
        let result = await (this.operations.delete as any)(this.model, ...args)
        return result
    }

    output = (data) => {
        if (Array.isArray(data)){
            data = data.map(entity => this._output(entity))
        } else {
            data = this._output(data)
        }
        return data
    }

    _output = (data) => {
        if (data.toObject) {
            data = data.toObject()
            data.id = data._id
            delete data._id
            delete data.__v
        }

        return data
    }

    subscribe(event, key, fn) {
        this.subscribers[event].push({ key, fn })
    }

    unsubscribe(event, key) {
        let toDelete = -1

        this.subscribers[event].forEach((el, i) => {
            if (el.key === key){
                toDelete = i
            }
        })

        if (toDelete > -1){
            this.subscribers[event].splice(toDelete, 1)
        }
    }
}
