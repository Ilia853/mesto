export class Popup {

    constructor (popupSelector) {
        this._popupSelector = popupSelector;
    }

    open () {
        this._popupSelector.classList.add('image-popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        this._popupSelector.addEventListener('click', this._closeViaOverlay.bind(this));
    }

    close () {
        this._popupSelector.classList.remove('image-popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
        this._popupSelector.removeEventListener('click', this._closeViaOverlay.bind(this));
    }

    _handleEscClose (evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _closeViaOverlay (evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    }

    setEventListeners () { // добавляет слушатель клика иконке закрытия попапа, и закрытие через overlay
        this.close();
    }
}