import { Popup } from "./Popup.js";
import { imagePopupPic, imagePopupTitle } from '../pages/index.js';

export class PopupWithImage extends Popup {

    constructor (data, popupSelector) {
        super(popupSelector);
        this._name = data.name;
        this._link = data.link;
    }
}