class Resource {

    static courseName: () => string

    lecture: Lecture
    type: string
    href: string

    category: Category
    fileRenamer: (any) => string

    size: string
    url: string
    filename: string
    isResolved: boolean = false

    constructor(type: string, href: string, lecture: Lecture) {
        this.lecture = lecture
        this.type = type
        this.href = href
    }

    static setCourseName(courseName: () => string) {
        Resource.courseName = courseName
    }

    setScraped(category: Category, fileRenamer: (any) => string) {
        this.category = category
        this.fileRenamer = fileRenamer
    }

    setResolved(size: string, url: string, filename: string) {
        this.size = size
        this.url = url
        this.filename = filename

        this.isResolved = true
    }
}
