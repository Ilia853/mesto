import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {

    constructor (popupSelector) {
        super(popupSelector);
        this._popupTitle = this._popup.querySelector('.image-popup__title');
        this._popupImage = this._popup.querySelector('.image-popup__pic');
    }

    open (title, image) {
    
        this._popupTitle.textContent = title;
        this._popupImage.src = image;
        this._popupImage.alt = title;
        super.open();
    }
}