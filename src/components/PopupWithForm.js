import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {

    constructor (popupSelector, {handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = document.querySelectorAll('.popup__input');
        this._form = document.querySelector('.popup__form');
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

        this._form.addEventListener('submit', () => {
            this._handleFormSubmit(this._getInputValues);
        })
    }

    close () {

        super.close();

        this._form.reset();
    }
}