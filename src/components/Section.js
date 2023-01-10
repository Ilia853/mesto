export class Section {

    constructor ({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._selector = document.querySelector(containerSelector);
    }

    renderItems(cards) {
        cards.forEach((item) => this._renderer(item));
    }

    addItem(element) {
        this._selector.prepend(element);
    }

    addInitaialItems(element) {
        this._selector.append(element);
    }
}