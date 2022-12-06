export class Card {

    constructor ({data, handleCardClick}, templateSelector) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _getCard () {
        const card = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

        return card;
    }

    createCard () {
        this._element = this._getCard();

        this._setEventLiteners();

        this._element.querySelector('.element__image').src = this._data.link;
        this._element.querySelector('.element__title').textContent = this._data.name;

        return this._element;
    }

    _setEventLiteners () {
        this._element.querySelector('.element__like-button').addEventListener('click', () => {
            this._changeLike();
        });

        this._element.querySelector('.element__del-button').addEventListener('click', () => {
            this._delImage();
        })

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick();
        })
    }

    _changeLike () {
        this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    }

    _delImage () {
        this._element.querySelector('.element');
        this._element.remove();
    }
}
