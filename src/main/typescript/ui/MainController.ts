class MainController {

    private sp: Picker<Section>
    private lp: Picker<Lecture>
    private widget: Widget

    constructor(private generator: Generator, private lectures: Array<Lecture>) {
    }

    createSectionPicker(sections: Array<Section>, sectionDomHooks: Array<Element>) {
        var onClicked = this.callbacks.onSectionClicked.bind(this);
        this.sp = new Picker<Section>(sections, "section", onClicked, sectionDomHooks)
    }

    createLecturePicker(lectures: Array<Lecture>, lectureDomHooks: Array<Element>) {
        var onClicked = this.callbacks.onLectureClicked.bind(this);
        this.lp = new Picker<Lecture>(lectures, "lecture", onClicked, lectureDomHooks)
    }

    createWidget(categories, widgetDomHook) {
        this.widget = new Widget(categories, this, widgetDomHook)
    }

    setSelectedLectures(predicate: (Lecture) => boolean) {
        this.lectures.forEach(lecture => {
            this.selectLecture(lecture, predicate(lecture))
        })
    }

    selectLecture(lecture: Lecture, selected = true) {
        if (lecture.selected === !selected) {
            lecture.selected = selected
            this.lp.updateCheckbox(lecture)
            this.sp.updateCheckbox(lecture.section)
            this.widget.updateResourceCount(this.generator.selectedResourceCount())
            this.updateMetalinkButton()
        }
    }

    selectCategory(category: Category, selected = true) {
        if (category.selected === !selected) {
            category.selected = selected
            this.updateMetalinkButton()
        }
    }

    private updateMetalinkButton() {
        this.widget.disableButton(this.generator.resourcesToDownload().length === 0)
    }

    generateMetalink() {
        this.widget.updateStatus("&nbsp;")
        this.widget.disableInteractions(true)
        this.sp.disableInteractions(true)
        this.lp.disableInteractions(true)
        var onResource = this.callbacks.onDownloadResource.bind(this)
        var onAll = this.callbacks.onDownloadComplete.bind(this)
        this.generator.generate(onResource, onAll)
    }

    private callbacks = {
        onDownloadResource: function (num: number, total: number, name: string) {
            this.widget.updateProgress(num, total)
            this.widget.updateStatus(name)
        },
        onDownloadComplete: function (url: string) {
            this.widget.disableInteractions(false)
            this.sp.disableInteractions(false)
            this.lp.disableInteractions(false)
            this.widget.download(url)
        },
        onLectureClicked: function (lecture: Lecture, isChecked: boolean) {
            this.selectLecture(lecture, isChecked)
        },
        onSectionClicked: function (section: Section, isChecked: boolean) {
            section.lectures.forEach(lecture => {
                this.selectLecture(lecture, isChecked)
            })
        }
    }
}
