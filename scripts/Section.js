export default class Section { // отвечает за отрисовку элементов на странице, нет своей разметки
                               // он получает разметку через функцию-колбэк и вставляет её в контейнер
    constructor ({ items, renderer }, containerSelector) {
        this._initialArray = items;
        this._renderer = renderer; // это функция
        this._selector = document.querySelector(containerSelector);
    }

    renderItems() {
        this._initialArray.forEach((item) => this._renderer(item));
    }
    
    addItem(element) {
        this._selector.prepend(element);
    }
}