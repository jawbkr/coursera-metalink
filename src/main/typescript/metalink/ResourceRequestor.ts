interface ResourceRequestor {
    request(resource: Resource, onResponse: (size: string, url: string, filename: string) => void)
}
