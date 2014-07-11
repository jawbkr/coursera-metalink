class BlobUrlImpl implements BlobUrl {

    generate(metalinkParts: Array<string>): string {
        var blob = new Blob(metalinkParts, {type: "application/metalink+xml"})
        return URL.createObjectURL(blob)
    }
}
