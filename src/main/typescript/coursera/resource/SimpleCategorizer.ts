/**
 * In this implementation, resources are categorized according to their anchor title.
 * The href is completely ignored.
 * Any unique titles are dumped into a "Miscellaneous" category.
 */
class SimpleCategorizer implements Categorizer {

    private categories: Array<Category>

    createCategories(resources: Array<Resource>) {
        var types = resources.map(resource => resource.type)
        //all unique resource types for which there are at least 2
        var uniques = types.filter((type, i, self) => self.indexOf(type) === i && self.lastIndexOf(type) !== i).sort()
        var areMisc = types.filter(type => uniques.indexOf(type) === -1).length > 0
        //the misc category will only be added if required
        var head = areMisc ? [Category.MISC_CATEGORY] : []

        this.categories = head.concat(uniques.map(unique => new Category(unique)))
    }

    getCategory(resource: Resource): Category {
        var isKnownCategory = this.categories.some(category => category.name === resource.type)
        return (isKnownCategory) ?
            this.categories.filter(c => c.name === resource.type)[0] : Category.MISC_CATEGORY
    }

    getCategories(): Array<Category> {
        return this.categories;
    }
}
