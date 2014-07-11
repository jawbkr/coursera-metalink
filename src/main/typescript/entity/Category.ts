class Category {

    static MISC_CATEGORY = new Category("Miscellaneous")

    name: string
    selected: boolean = false

    constructor(name: string) {
        this.name = name
    }

    get isMisc() {
        return this === Category.MISC_CATEGORY
    }
}
