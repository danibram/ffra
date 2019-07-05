export class Service {
    model: any
    subscribers: {
        all: any[]
        get: any[]
        find: any[]
        update: any[]
        delete: any[]
    }
    name: string
    operations: {
        findOne: Function
        find: Function
        create: Function
        update: Function
        delete: Function
    }

    constructor(name, model, operations = {}) {
        this.name = name
        this.model = model
        this.operations = Object.assign(
            {},
            {
                findOne: () => 'Not implemented',
                find: () => 'Not implemented',
                create: () => 'Not implemented',
                update: () => 'Not implemented',
                delete: () => 'Not implemented'
            },
            operations
        )
    }

    findOne = async (...args) =>
        await this.operations.findOne(this.model, ...args)
    find = async (...args) => await this.operations.find(this.model, ...args)
    create = async (...args) =>
        await this.operations.create(this.model, ...args)
    update = async (...args) =>
        await this.operations.update(this.model, ...args)
    delete = async (...args) =>
        await this.operations.delete(this.model, ...args)

    output = data => {
        if (Array.isArray(data)) {
            data = data.map(entity => this._output(entity))
        } else {
            data = this._output(data)
        }
        return data
    }

    _output = data => data

    subscribe(event, key, fn) {
        this.subscribers[event].push({ key, fn })
    }

    unsubscribe(event, key) {
        let toDelete = -1

        this.subscribers[event].forEach((el, i) => {
            if (el.key === key) {
                toDelete = i
            }
        })

        if (toDelete > -1) {
            this.subscribers[event].splice(toDelete, 1)
        }
    }
}
