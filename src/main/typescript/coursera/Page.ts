interface PageSection {
    domHook: Element
    name: string
    lectures: Array<PageLecture>
}

interface PageLecture {
    domHook: Element
    viewed: boolean
    resources: Array<PageResource>
}

interface PageResource {
    title: string
    href: string
}


class Page {

    constructor(private supportedResources: SupportedResources) {
    }

    courseName: () => string = (function () {
        var result
        var courseClass = ".course-topbanner-name"
        var observer = new MutationObserver(function (mutations: MutationRecord[], self) {
            mutations.forEach(function (mutation: MutationRecord) {
                if (mutation.addedNodes) {
                    var elem = (<Element>mutation.target).querySelector(courseClass)
                    if (elem) {
                        result = elem.textContent.trim()
                        self.disconnect()
                    }
                }
            })
        })
        var div = document.querySelector(courseClass)

        if (div) {
            result = div.textContent.trim()
        } else {
            observer.observe(document.body, { childList: true })
        }
        return function () {
            return result
        }
    })()

    sections: Array<PageSection> = [].map.call(document.querySelectorAll(".course-item-list-header"), div => {
        var h3 = div.querySelector("h3")
        return {
            domHook: h3,
            name: h3.textContent.trim(),
            lectures: [].map.call(div.nextSibling.childNodes, li => {
                return {
                    domHook: li.querySelector(".course-lecture-item-resource"),
                    viewed: li.className === "viewed",
                    resources: [].slice.call(li.querySelectorAll(".course-lecture-item-resource > a"))
                        //preemptive check to see if this item should be included
                        .filter(a => this.supportedResources.isAcceptable(a.href.trim()))
                        .map(a => {
                            return {
                                title: a.title.trim(),
                                href: a.href.trim()
                            }
                        })
                }
            })
        }
    })

    widgetDomHook: Element = document.getElementsByClassName("course-lectures-list")[0]
}
