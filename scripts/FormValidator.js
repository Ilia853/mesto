import { openPopup, popupAddMesto } from "./index.js";

export class FormValidator {

    constructor (form, settings) {
        this._formSelector = form;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
    }

    _showInputError (inputElement, errorMessage) {
        const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
      };
      
    _hideInputError (inputElement) {
        const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
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
        this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formSelector.querySelector(this._submitButtonSelector);
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
        
    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', 'disabled');
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled', 'disabled');
        };
    };

    openPopup(popupAddMesto) {
        this._toggleButtonState;
    }
}