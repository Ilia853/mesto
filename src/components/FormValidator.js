export class FormValidator {

    constructor (form, settings) {
        this._form = form;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
    }

    _showInputError (inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
      };

    _hideInputError (inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
        };

    _checkInputValidity (inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _setEventListeners () {
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._buttonElement = this._form.querySelector(this._submitButtonSelector);
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    enableValidation () {
        this._setEventListeners();
    };

    _hasInvalidInput () {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    disableButton() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', 'disabled');
    }

    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this.disableButton();
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled', 'disabled');
        };
    };
}