export class FormFalidator {

    constructor (form, settings) {
        this._formSelector = form;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
    }

    enableValidation() {
        this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    
        this._inputList.forEach((inputSelector) => {
        this._inputSelector.addEventListener('input', (evt) => {
            evt.preventDefault();
        });

            this._setEventListeners(inputSelector, settings);
        });
    }

    _setEventListeners() {}

}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__form-button',
    inactiveButtonClass: 'popup__form-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error-message'
  });