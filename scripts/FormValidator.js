export class FormValidator {

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
    
        this._setEventListeners();
        
    }

    _setEventListeners(settings) {
        this._buttonElement = this._formSelector.querySelector(this._submitButtonSelector);
        
        this._toggleButtonState(settings);

        this._inputList.forEach((inputSelector) => {
            inputSelector.addEventListener('input', () => {
                this._checkInputValidity(inputSelector, settings);
                this._toggleButtonState(this._inputList, this._buttonElement);
            })
        })
    }

    _checkInputValidity(inputSelector, settings) {
        if (!inputSelector.validity.valid) {
            this._showInputError(inputSelector, inputSelector.validationMessage, settings);
        } else {
            this._hideInputError(inputSelector, settings);
        }
    }

    _toggleButtonState(inputList) {
        if (this._hasInvalidInput(inputList)) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', 'disabled');
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled', 'disabled');
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputSelector) => {
            return !inputSelector.validity.valid;
        })
    }

    _showInputError(inputSelector, errorMessage) {
        this._errorElement = this._formSelector.querySelector(`.${inputSelector.id}-error`);
        this._inputEl = this._formSelector.querySelector(this._inputSelector);

        this._inputEl.classList.add(this._inputErrorClass);
        this._errorElement.textContent = errorMessage;
    }

    _hideInputError(inputSelector) {
        this._errorElement = this._formSelector.querySelector(`.${inputSelector.id}-error`);
        inputSelector.classList.remove(this._inputErrorClass);
        this._errorElement.textContent = '';
    }
}