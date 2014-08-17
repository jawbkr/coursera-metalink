class SimpleFileRenamer implements FileRenamer {

    private static CDN_FILENAME = /^.+\/(.+\.[-\w]+)(?:\?|$)/ //some/path/to/(filename.ext)
    private static COURSERA_FILENAME = /^Content-Disposition: attachment; filename="([^"]+)/m
    private static REPLACE_SORTING = /^\d\d? - \d\d? - /

    constructor(private supportedResources: SupportedResources) {
    }

    getRenamer(resource: Resource): (any) => string {
        switch (this.supportedResources.getResourceOrigin(resource.href)) {
            case ResourceOrigin.Cdn:
                return SimpleFileRenamer.getCdnRenamer(resource)
            case ResourceOrigin.Coursera:
                return SimpleFileRenamer.getCourseraRenamer(resource)
        }
    }

    /**
     * A CDN resource filename is just determined from the href.
     */
    private static getCdnRenamer(resource: Resource): () => string {
        return function (): string {
            var fromHref = SimpleFileRenamer.CDN_FILENAME.exec(resource.href)
            var filename = fromHref[1]

            return resource.lecture.getOrder() + "-" + resource.category.name.toLowerCase() + "-" + filename
        }
    }

    /**
     * A Coursera resource (i.e. video or sub) filename is determined from the Content-Disposition header.
     */
    private static getCourseraRenamer(resource: Resource): (responseHeaders: string) => string {
        return function (responseHeaders: string): string {
            var fromHeaders = SimpleFileRenamer.COURSERA_FILENAME.exec(responseHeaders)
            var filename = decodeURIComponent(fromHeaders[1])

            return filename.replace(SimpleFileRenamer.REPLACE_SORTING, resource.lecture.getOrder() + "-")
        }
    }
}
