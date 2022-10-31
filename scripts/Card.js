export class Card {

    constructor (name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
    }

    _getCard () {
        const card = document.querySelector(this._templateSelector).content.children[0].cloneNode(true);

        return card;
    }

    createCard () {
        this._element = this._getCard();

        this._setEventLiteners();

        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;
    }

    _setEventLiteners () {
        this._element.querySelector('.element__like-button').addEventListener('click', () => {
            this._changeLike();
        });

        this._element.querySelector('.element__del-button').addEventListener('click', () => {
            this._delImage();
        })

        // this._element.querySelector('.element__image').addEventListener('click', () => {
        //     this._zoomImage();
        // })
    }

    _changeLike () {
        this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    }

    _delImage () {
        this._element.querySelector('.element');
        this._element.remove();
    }

    // _zoomImage () {
    //     this._element.querySelector('.image-popup').classList.add('image-popup_opened');
    //     this._element.querySelector('.image-popup__pic').src = this._link;
    //     this._element.querySelector('.image-popup__title').textContent = this._name;
    // }
}
