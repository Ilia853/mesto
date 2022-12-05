import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {

    constructor ({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = document.querySelector('.popup__form_type_mesto');
        this._inputList = this._form.querySelectorAll('.popup__input');
    }

    _getInputValues () {

        this._inputValues = {};

        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        })

        return this._inputValues;
    }

    

    setEventListeners () {

        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        })

    }

    close () {

        super.close();
        this._form.reset();
    }
}