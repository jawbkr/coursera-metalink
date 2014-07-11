class Section implements Pickable {

    name: string
    lectures: Array<Lecture>

    constructor(name: string) {
        this.name = name
    }

    setLectures(lectures: Array<Lecture>) {
        this.lectures = lectures
    }

    isPicked(): boolean {
        var pickedLectures: number = this.lectures.filter(l => l.isPicked()).length
        var allLectures: number = this.lectures.length

        if (pickedLectures === allLectures) return true
        if (pickedLectures === 0) return false
        return null
    }
}
