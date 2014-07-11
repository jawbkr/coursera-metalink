class Resolver {

    private numResolved: number
    private total: number

    private onResourceCallback: (num: number, total: number, name: string) => void
    private onAllCallback: () => void

    constructor(private resourceRequestor: ResourceRequestor) {
    }

    setCallbacks(onResource: (number, number, string) => void, onAll: () => void) {
        this.onResourceCallback = onResource
        this.onAllCallback = onAll
    }

    resolveAll(resources: Array<Resource>) {
        this.numResolved = 0
        this.total = resources.length

        resources.forEach(resource => this.resolve(resource))
    }

    private resolve(resource: Resource) {
        if (resource.isResolved) {
            this.onResourceResolved(resource)
        } else {
            var onResponse = function (size, url, filename) {
                resource.setResolved(size, url, filename)
                this.onResourceResolved(resource)
            }
            this.resourceRequestor.request(resource, onResponse.bind(this))
        }
    }

    private onResourceResolved(resource: Resource) {
        this.numResolved++
        this.onResourceCallback(this.numResolved, this.total, resource.filename)
        if (this.numResolved === this.total) {
            this.onAllCallback()
        }
    }
}
