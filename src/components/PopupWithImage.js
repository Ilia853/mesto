import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {

    constructor (popupSelector) {
        super(popupSelector);
        this._popupTitle = document.querySelector('.image-popup__title');
        this._popupImage = document.querySelector('.image-popup__pic');
    }

    zoomImage (title, image) {
    
        this._popupTitle.textContent = title;
        this._popupImage.src = image;
        super.open();
    }
}