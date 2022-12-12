export class Popup {

    constructor (popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscCloseRef = this._handleEscClose.bind(this);
        this._closeViaOverlayRef = this._closeViaOverlay.bind(this);
    }

    open () {
        this._popup.classList.add('image-popup_opened');
        document.addEventListener('keydown', this._handleEscCloseRef);
    }

    close () {
        this._popup.classList.remove('image-popup_opened');
        document.removeEventListener('keydown', this._handleEscCloseRef);
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

    setEventListeners () {
        this._popup.addEventListener('click', this._closeViaOverlayRef);

        const closeButton = this._popup.querySelector('.popup__close-button');
        closeButton.addEventListener('click', () => this.close());
    }
}