declare var GM_xmlhttpRequest
declare var GM_addStyle
interface GMResponse {responseHeaders: string; finalUrl: string}

declare var style
declare var templates: Templates
interface Templates {
    widget(any: any): string
}
