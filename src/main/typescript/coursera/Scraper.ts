class Scraper {

    sections: Array<Section>
    lectures: Array<Lecture>
    resources: Array<Resource>
    categories: Array<Category>

    lectureDomHooks: Array<Element>
    sectionDomHooks: Array<Element>
    widgetDomHook: Element

    constructor(private page: Page, private categorizer: Categorizer, private fileRenamer: FileRenamer) {
        Resource.setCourseName(this.page.courseName)

        this.sections = this.getSections()
        this.lectures = this.sections.reduce((a, b) => a.concat(b.lectures), [])
        this.resources = this.lectures.reduce((a, b) => a.concat(b.resources), [])

        this.categorizer.createCategories(this.resources)
        //set the category and fileRenamer for each resource
        this.processResources()

        this.categories = this.categorizer.getCategories()

        this.lectureDomHooks = this.getLectureDomHooks()
        this.sectionDomHooks = this.getSectionDomHooks()
        this.widgetDomHook = this.getWidgetDomHook()
    }

    private getSections() {
        return this.page.sections.map(s => {
            var section = new Section(s.name)
            var lectures = s.lectures.map((l, i) => {
                var lecture = new Lecture(i + 1, l.viewed, section)
                var resources = l.resources.map(r =>
                        new Resource(r.title, r.href, lecture)
                )
                lecture.setResources(resources)
                return lecture
            })
            section.setLectures(lectures)
            return section
        })
    }

    private processResources() {
        this.resources.forEach(resource => {
            var category = this.categorizer.getCategory(resource)
            var fileRenamer = this.fileRenamer.getRenamer(resource)

            resource.setScraped(category, fileRenamer)
        })
    }

    private getLectureDomHooks() {
        return this.page.sections.reduce((a, b) => a.concat(b.lectures), []).map(l => l.domHook)
    }

    private getSectionDomHooks() {
        return this.page.sections.map(s => s.domHook)
    }

    private getWidgetDomHook() {
        return this.page.widgetDomHook
    }
}
