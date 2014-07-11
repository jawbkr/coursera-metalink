class Widget {

    private categoryCheckboxes: Array<CategoryCheckbox>
    private progress: HTMLElement
    private progressBar: HTMLElement
    private button: HTMLButtonElement
    private hiddenLink: HTMLLinkElement
    private status: HTMLElement
    private selectLectureShortcutsDisabled = false

    private selectLectureShortcuts: Array<SelectLectureShortcut> = [
        { label: "New", predicate: lecture => !lecture.viewed },
        { label: "All", predicate: lecture => true },
        { label: "None", predicate: lecture => false }
    ]

    constructor(categories: Array<Category>, private controller: MainController, domHook: Element) {
        this.createWidget(domHook, categories);
        this.setupSelectLectureShortcuts()
        this.categoryCheckboxes = this.setupCategoryCheckboxes(categories)
        this.progress = <HTMLElement>document.querySelector('#cmg-progress')
        this.progressBar = <HTMLElement>document.querySelector("#cmg-action div.bar")
        this.status = <HTMLElement>document.querySelector("#cmg-status")
        this.hiddenLink = <HTMLLinkElement>document.querySelector("#cmg-action > a")
        this.button = this.setupMetalinkButton()
    }

    private createWidget(domHook, categories) {
        var container = document.createElement("div")
        domHook.parentNode.insertBefore(container, domHook.nextElementSibling)

        var context = {
            selectLectureShortcuts: this.selectLectureShortcuts,
            categories: categories
        }

        container.innerHTML = templates.widget(context)
    }

    private setupSelectLectureShortcuts() {
        var that = this
        var links = document.querySelectorAll("a.cmg-pick-lecture")
        this.selectLectureShortcuts.forEach(function (sls, i) {
            links[i].onclick = function (evt) {
                evt.preventDefault()
                if (!that.selectLectureShortcutsDisabled) {
                    that.controller.setSelectedLectures(sls.predicate)
                }
            }
        })
    }

    private setupCategoryCheckboxes(categories: Array<Category>): Array<CategoryCheckbox> {
        var spans = document.querySelectorAll("#cmg-pick-categories input[type=checkbox] ~ span")
        var checkboxes = document.querySelectorAll("#cmg-pick-categories input[type=checkbox]")
        var that = this.controller

        return categories.map(function (category, i) {
            checkboxes[i].onclick = function () {
                that.selectCategory(category, this.checked)
            }

            return {
                category: category,
                label: checkboxes[i].parentElement,
                checkbox: checkboxes[i],
                resourceCount: spans[i]
            }
        })
    }

    private setupMetalinkButton(): HTMLButtonElement {
        var button = <HTMLButtonElement>document.querySelector("#cmg-action > button")
        var that = this.controller

        button.onclick = function () {
            that.generateMetalink()
        }

        return button
    }

    updateResourceCount(resourceCounts: Array<number>) {
        resourceCounts.forEach((count, i)  => {
            this.categoryCheckboxes[i].resourceCount.textContent = (count > 0) ? <string>count : ""
        })
    }

    updateStatus(status: string) {
        this.status.innerHTML = status
    }

    disableInteractions(disabled: boolean = true) {
        this.disableButton(disabled)
        this.disableCategoryCheckboxes(disabled)
        this.selectLectureShortcutsDisabled = disabled
        this.progress.className = (!disabled) ? "cmg-progress-hidden" : ""
    }

    disableButton(disabled: boolean = true) {
        this.button.disabled = disabled
    }

    private disableCategoryCheckboxes(disabled: boolean = true) {
        this.categoryCheckboxes.forEach(categoryCheckbox => {
            categoryCheckbox.checkbox.disabled = disabled
            categoryCheckbox.label.style.color = (disabled) ? "#888" : "#333"
        })
    }

    updateProgress(num: number, total: number) {
        var width = Math.floor(num / total * 100)
        this.progressBar.style.width = <string>width + "%"
    }

    download(url: string) {
        this.hiddenLink.href = url
        this.hiddenLink.click()
    }
}


interface SelectLectureShortcut {
    label: string
    predicate: (Lecture) => boolean
}

interface CategoryCheckbox {
    category: Category
    label: HTMLElement
    checkbox: HTMLInputElement
    resourceCount: HTMLElement
}
