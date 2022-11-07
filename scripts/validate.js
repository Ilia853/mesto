function showInputError (formSelector, inputSelector, errorMessage, settings) {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
};

function hideInputError (formSelector, inputSelector, settings) {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(settings.inputErrorClass);
    errorElement.textContent = '';
  };

function checkInputValidity (formSelector, inputSelector, settings) {
    if (!inputSelector.validity.valid) {
      showInputError(formSelector, inputSelector, inputSelector.validationMessage, settings);
    } else {
      hideInputError(formSelector, inputSelector, settings);
    }
};

function setEventListeners (formSelector, settings) {
    const inputList = Array.from(formSelector.querySelectorAll(settings.inputSelector));
    const buttonElement = formSelector.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, settings);
    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', function () {
        checkInputValidity(formSelector, inputSelector, settings);
        toggleButtonState(inputList, buttonElement, settings);
      });
    });
};

function enableValidation (settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formSelector) => {
      formSelector.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
        setEventListeners(formSelector, settings);
      });
};

function hasInvalidInput () {
    return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
};
  
const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
      } else {
        buttonElement.classList.remove(settings.inactiveButtonClass);
        buttonElement.removeAttribute('disabled', 'disabled');
        };
};
  
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__form-button',
    inactiveButtonClass: 'popup__form-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error-message'
  });

