class Lecture implements Pickable {

    private index: number
    viewed: boolean
    section: Section

    resources: Array<Resource>
    selected = false

    constructor(index: number, viewed: boolean, section: Section) {
        this.index = index
        this.viewed = viewed
        this.section = section
    }

    setResources(resources: Array<Resource>) {
        this.resources = resources
    }

    getOrder(): string {
        return this.index < 10 ? "0" + this.index : this.index
    }

    isPicked(): boolean {
        return this.selected
    }
}
