import { Popup } from "./Popup.js";

export class PopupDelCard extends Popup {

    constructor ({popupSelector}) {
        super(popupSelector);
        this._form = document.querySelector('.popup__form_type_delete-card');
    }

    deleteFormSubmit (func) {
        this._deleteSubmit = func;
    }

    setEventListeners() {

        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._deleteSubmit();
        })
    }
}