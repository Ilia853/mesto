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
        this._cardImage = this._element.querySelector('.element__image');

        this._setEventLiteners();

        this._cardImage.src = this._data.link;
        this._element.querySelector('.element__title').textContent = this._data.name;
        this._cardImage.alt = this._data.name;


        return this._element;
    }

    _setEventLiteners () {
        this._likeButton = this._element.querySelector('.element__like-button');

        this._likeButton.addEventListener('click', () => {
            this._changeLike();
        });

        this._element.querySelector('.element__del-button').addEventListener('click', () => {
            this._delImage();
        })

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick();
        })
    }

    _changeLike () {
        this._likeButton.classList.toggle('element__like-button_active');
    }

    _delImage () {
        this._element.remove();
        this._element = null;
    }
}
