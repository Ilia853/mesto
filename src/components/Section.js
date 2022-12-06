export class Section {

    constructor ({ items, renderer }, containerSelector) {
        this._initialArray = items;
        this._renderer = renderer;
        this._selector = document.querySelector(containerSelector);
    }

    renderItems() {
        this._initialArray.forEach((item) => this._renderer(item));
    }

    addItem(element) {
        this._selector.prepend(element);
    }
}