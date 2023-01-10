import { Popup } from "./Popup.js";

export class PopupDelCard extends Popup {

    constructor ({popupSelector, deleteSubmit}) {
        super(popupSelector);
        this._deleteConfirmButton = document.querySelector('.popup__form-button');
        this._deleteSubmit = deleteSubmit;
    }

    // deleteFormSubmit (func) {
    //     this._deleteSubmit = func;
    // }

    // close() {
    //     super.close();
    // }

    setEventListeners() {
        super.setEventListeners();

        this._deleteConfirmButton.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._deleteSubmit();
        })
    }
}