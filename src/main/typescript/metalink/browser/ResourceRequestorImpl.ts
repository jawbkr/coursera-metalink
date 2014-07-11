class ResourceRequestorImpl implements ResourceRequestor {

    private static SIZE = /^Content-Length: (\d+)$/m

    request(resource: Resource, callback: (size, url, filename) => void) {
        GM_xmlhttpRequest({
            url: resource.href,
            method: "HEAD",
            onload: function (gmResponse: GMResponse) {
                ResourceRequestorImpl.setResolved(resource, gmResponse, callback)
            }
        })
    }

    private static setResolved(resource: Resource, gmResponse: GMResponse, callback: (size, url, filename) => void) {
        var responseHeaders = gmResponse.responseHeaders
        var match = ResourceRequestorImpl.SIZE.exec(responseHeaders)

        var size = (match) ? match[1] : null
        var url = gmResponse.finalUrl
        var filename = resource.fileRenamer(responseHeaders)

        callback(size, url, filename)
    }
}
