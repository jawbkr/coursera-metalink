class Generator {

    constructor(private resolver: Resolver,
                private blobUrl: BlobUrl,
                private resources: Array<Resource>,
                private categories: Array<Category>) {
    }

    selectedResourceCount(): Array<number> {
        return this.categories.map(category =>
                this.resources.filter(resource => resource.category === category && resource.lecture.selected).length
        )
    }

    resourcesToDownload(): Array<Resource> {
        return this.resources.filter(resource => resource.lecture.selected && resource.category.selected)
    }

    generate(onResource: (integer, integer, string) => void, onAll: (string) => void) {
        var resources = this.resourcesToDownload()
        var onAllResolved = function () {
            onAll(this.getBlobUrl(resources))
        }
        this.resolver.setCallbacks(onResource, onAllResolved.bind(this))
        this.resolver.resolveAll(resources)
    }

    private getBlobUrl(resources: Array<Resource>): string {
        var head = Generator.HEAD
        var body = resources.reduce((a, b) => a + Generator.toMetalink(b), "")
        var last = Generator.LAST
        return this.blobUrl.generate([head, body, last])
    }

    private static HEAD =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<metalink version="3.0" xmlns="http://www.metalinker.org/">\n' +
        '\t<files>\n'

    private static LAST =
        '\t</files>\n' +
        '</metalink>\n'

    private static toMetalink(resource): string {
        var path = Generator.path(Resource.courseName(), resource.lecture.section.name, resource.filename)
        var type = resource.url.substring(0, resource.url.indexOf("://"))

        return '' +
            '\t\t<file name="' + Generator.escape(path) + '">\n' +
            ((resource.size) ? '\t\t\t<size>' + resource.size + '</size>\n' : '') +
            '\t\t\t<resources><url type="' + type + '">' + Generator.escape(resource.url) + '</url></resources>\n' +
            '\t\t</file>\n'
    }

    /**
     * Slashes in the name attribute determine the save path.
     * Any existing slashes that happen to be in the filename will be replaced with underscores.
     */
    private static path(...parts: string[]): string {
        return parts.map(item => item.replace(/\//g, '_')).join('/')
    }

    private static escape(xml: string): string {
        return xml
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
    }
}
