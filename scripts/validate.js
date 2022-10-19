function showInputError (formSelector, inputSelector, errorMessage) {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(objectForValidate.inputErrorClass);
  errorElement.textContent = errorMessage;
};

function hideInputError (formSelector, inputSelector) {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(objectForValidate.inputErrorClass);
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
    const inputList = Array.from(formSelector.querySelectorAll(objectForValidate.inputSelector));
    const buttonElement = formSelector.querySelector(objectForValidate.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', function () {
        checkInputValidity(formSelector, inputSelector);
        toggleButtonState(inputList, buttonElement);
      });
    });
};

function enableValidation () {
    const formList = Array.from(document.querySelectorAll(objectForValidate.formSelector));
    formList.forEach((formSelector) => {
      formSelector.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
        setEventListeners(formSelector);
      });
};

function hasInvalidInput (inputList) {
    return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
};
  
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(objectForValidate.inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
      } else {
        buttonElement.classList.remove(objectForValidate.inactiveButtonClass);
        buttonElement.removeAttribute('disabled', 'disabled');
        };
};
  
enableValidation(objectForValidate = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__form-button',
    inactiveButtonClass: 'popup__form-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input_error-message'
  });