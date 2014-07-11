/**
 * Some resources are links to forum posts, class wiki pages, youTube videos, etc.
 * We should not consider these for downloaded.
 */
enum ResourceOrigin {
    Coursera,
    Cdn
}

/**
 * We'll use a simple whitelisting strategy based on href to select the downloadable resources.
 * If this leads to "missing" resources in the category selection list, we may have to employ
 * a more elaborate solution.
 */
class SupportedResources {

    private static SUPPORTED_RESOURCES = [
        {
            resourceOrigin: ResourceOrigin.Coursera,
            whitelist: [
                /^https:\/\/class\.coursera\.org\/.+\/lecture\/(subtitles|download)/
            ]
        },
        {
            resourceOrigin: ResourceOrigin.Cdn,
            whitelist: [
                /^https?:\/\/[\w.-]+\.cloudfront\.net\//,       //amazon cloudfront
                /^https?:\/\/[\w.-]+\.amazonaws\.com\//         //amazon aws
            ]
        }
    ]

    isAcceptable(href: string): boolean {
        return SupportedResources.SUPPORTED_RESOURCES.some(sr =>
                sr.whitelist.some(item => item.test(href))
        )
    }

    getResourceOrigin(href: string): ResourceOrigin {
        for (var i = 0; i < SupportedResources.SUPPORTED_RESOURCES.length; i++) {
            if (SupportedResources.SUPPORTED_RESOURCES[i].whitelist.some(item => item.test(href))) {
                return SupportedResources.SUPPORTED_RESOURCES[i].resourceOrigin
            }
        }
    }
}
