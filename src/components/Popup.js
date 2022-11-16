export class Popup {

    constructor (popupSelector) {
        this._popupSelector = popupSelector;
    }

    open () { // открытие попапа
        this._popupSelector.classList.add('image-popup_opened');
    }

    close () { // закрытие попапа
        //this._popupSelector.classList.remove('image-popup_opened');
        this.setEventListeners();
    }

    _handleEscClose (event) { // содержит логику закрытия попапа клавишей Esc
        if (event.key === 'Escape') {
            this.close();
            console.log('ok');
        }
    }

    setEventListeners () { // добавляет слушатель клика иконке закрытия попапа, и закрытие через overlay
        document.querySelectorAll('.popup__close-button').addEventListener('click', () => {
            this._popupSelector.classList.remove('image-popup_opened');
        })
    }
}