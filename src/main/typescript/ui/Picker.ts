class Picker<T extends Pickable> {

    private checkboxes: Array<HTMLInputElement> = []

    constructor(private pickables: Array<T>,
                className: string,
                onclick: (T, boolean) => void,
                domHooks: Array<HTMLElement>) {
        this.createCheckboxes(className, onclick, domHooks)
    }

    private createCheckboxes(className: string, onclick: (T, boolean) => void, domHooks: Array<HTMLElement>) {
        this.pickables.forEach((pickable, i) => {
            var checkbox = document.createElement("input")
            checkbox.className = "cmg-pickable-" + className
            checkbox.setAttribute("type", "checkbox")
            checkbox.onclick = function (evt) {
                evt.stopPropagation()
                onclick(pickable, this.checked)
            }
            this.checkboxes.push(checkbox)
            domHooks[i].insertBefore(checkbox, domHooks[i].firstChild)
        })
    }

    updateCheckbox(pickable: T) {
        var checkbox = this.checkboxes[this.pickables.indexOf(pickable)]
        var picked = pickable.isPicked()
        if (picked === null) {
            checkbox.indeterminate = true
        } else {
            checkbox.indeterminate = false
            checkbox.checked = picked
        }
    }

    disableInteractions(disabled: boolean = true) {
        this.checkboxes.forEach(checkbox => {
            checkbox.disabled = disabled
        })
    }
}
