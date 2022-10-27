export class Card {

    constructor (name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
    }

    _getCard () {
        const card = document.querySelector('.card-element').content.querySelector('.element').cloneNode(true);

        return card;
    }

    createCard () {
        this._element = this._getCard();

        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;
    }
}
