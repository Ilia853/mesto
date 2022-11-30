// import { openPopup, imagePopup, imagePopupPic, imagePopupTitle } from './index.js';

export class Card {

    constructor (name, link, templateSelector, {handleCardClick}) {
        this._name = name;
        this._link = link;
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

    // _zoomImage () {
    //     openPopup(imagePopup);

    //     imagePopupPic.src = this._link;
    //     imagePopupTitle.textContent = this._name;
    // }
}
