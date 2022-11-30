export class Popup {

    constructor (popupSelector) {
        this._popupSelector = popupSelector;
    }

    _handleEscCloseRef = this._handleEscClose.bind(this);
    _closeViaOverlayRef = this._closeViaOverlay.bind(this);

    open () {
        this._popupSelector.classList.add('image-popup_opened');
        document.addEventListener('keydown', this._handleEscCloseRef);
        this._popupSelector.addEventListener('click', this._closeViaOverlayRef);
    }

    close () {
        this._popupSelector.classList.remove('image-popup_opened');
        document.removeEventListener('keydown', this._handleEscCloseRef);
        this._popupSelector.removeEventListener('click', this._closeViaOverlayRef);
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