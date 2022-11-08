import {Card} from './Card.js';
import {FormFalidator} from './FormValidator.js';

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
];

const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupCloseButton = document.querySelector('.popup__close-button_type_edit');
const imagePopupCloseButton = document.querySelector('.image-popup__close-button');
const imagePopup = document.querySelector('.image-popup');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const popupFormTypeEdit = document.querySelector('.popup__form_type_edit');
const popupFormTypeMesto = document.querySelector('.popup__form_type_mesto');
const mestoAddButton = document.querySelector('.profile__add-button');
const popupAddMesto = document.querySelector('.popup_type_mesto');
const mestoAddCloseButton = document.querySelector('.popup__close-button_type_mesto');
const mestoInput = document.querySelector('.popup__input_type_mesto');
const linkInput = document.querySelector('.popup__input_type_link');

function renderCard (name, link, templateSelector) {
    const card = new Card(name, link, templateSelector);
    const cardElement = card.createCard();
    const elementsList = document.querySelector('.elements__list');

    elementsList.prepend(cardElement);
}

initialCards.forEach((item) => {
    renderCard(item.name, item.link, '.card-element');
})

function addNewCard (evt) {
    evt.preventDefault();
    renderCard(mestoInput.value, linkInput.value, '.card-element')

    mestoInput.value = '';
    linkInput.value = '';

    closePopup(popupAddMesto);
}

function setPopupEditValue () {
    nameInput.value = profileName.textContent.trim();
    jobInput.value = profileJob.textContent.trim();
}

function changePopupValue () {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}
  
function handleFormSubmit (evt) {
    evt.preventDefault ();
    changePopupValue ();
    closePopup(popupProfileEdit);
}

export function openPopup(type) {
    type.classList.add('image-popup_opened');
    document.addEventListener('keydown', closeViaEsc);
    type.addEventListener('click', closeViaOverlay);
}

function closePopup(type) {
    type.classList.remove('image-popup_opened');
    document.removeEventListener('keydown', closeViaEsc);
    type.removeEventListener('click', closeViaOverlay);
}

profileEditButton.addEventListener('click', () => {
    formValidatorProfile.enableValidation();
    openPopup(popupProfileEdit);
    setPopupEditValue();
});

popupCloseButton.addEventListener('click', () => closePopup(popupProfileEdit));

imagePopupCloseButton.addEventListener('click', () => closePopup(imagePopup));

popupFormTypeEdit.addEventListener('submit', handleFormSubmit);

mestoAddButton.addEventListener('click', () => {
    formValidatorMesto.enableValidation();
    openPopup(popupAddMesto)});

mestoAddCloseButton.addEventListener('click', () => closePopup(popupAddMesto));

popupFormTypeMesto.addEventListener('submit', addNewCard);

const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__form-button',
    inactiveButtonClass: 'popup__form-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error-message'
}

const formValidatorMesto = new FormFalidator (popupFormTypeMesto, settings);

const formValidatorProfile = new FormFalidator (popupFormTypeEdit, settings);

function closeViaEsc (evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelectorAll('.image-popup_opened');
      openedPopup.forEach(closePopup);
    };
  };
  
function closeViaOverlay (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    };
  };
  