const selectorsForValidate = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_type_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error-message'
};

function showInputError (formSelector, inputSelector, errorMessage) {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add('form__input_type_error');
  errorElement.classList.add('popup__input_error-message');
  errorElement.textContent = errorMessage;
};

function hideInputError (formSelector, inputSelector) {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove('form__input_type_error');
    errorElement.classList.remove('popup__input_error-message');
    errorElement.textContent = '';
  };

function checkInputValidity (formSelector, inputSelector) {
    if (!inputSelector.validity.valid) {
      showInputError(formSelector, inputSelector, inputSelector.validationMessage);
    } else {
      hideInputError(formSelector, inputSelector);
    }
};

function setEventListeners (formSelector) {
    const inputList = Array.from(formSelector.querySelectorAll('.popup__input'));
    const buttonElement = formSelector.querySelector('.popup__form-button_type_abled');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', function () {
        checkInputValidity(formSelector, inputSelector);
        toggleButtonState(inputList, buttonElement);
      });
    });
};

function enableValidation () {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formSelector) => {
      formSelector.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
        setEventListeners(formSelector);
      });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  };
  
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.remove('popup__form-button_type_abled');
      buttonElement.classList.add('popup__form-button_type_disabled');
      buttonElement.setAttribute('disabled', 'disabled');
      } else {
        buttonElement.classList.remove('popup__form-button_type_disabled');
        buttonElement.classList.add('popup__form-button_type_abled');
        buttonElement.removeAttribute('disabled', 'disabled');
        };
  };
  
  enableValidation(selectorsForValidate);