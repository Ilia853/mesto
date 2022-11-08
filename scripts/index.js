import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './cards.js';
import { settings } from './settingsForValidation.js';


const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupCloseButton = document.querySelector('.popup__close-button_type_edit');
const imagePopupCloseButton = document.querySelector('.image-popup__close-button');
export const imagePopup = document.querySelector('.image-popup');
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
const elementsList = document.querySelector('.elements__list');
export const imagePopupPic = imagePopup.querySelector('.image-popup__pic');
export const imagePopupTitle =imagePopup.querySelector('.image-popup__title');

function renderCard (name, link, templateSelector) {
    const card = new Card(name, link, templateSelector);
    const cardElement = card.createCard();
    
    return cardElement;
}

initialCards.forEach((item) => {
    const cardList = renderCard(item.name, item.link, '.card-element');
    elementsList.prepend(cardList);
})

function addNewCard (evt) {
    evt.preventDefault();
    const card = renderCard(mestoInput.value, linkInput.value, '.card-element');
    elementsList.prepend(card);

    popupFormTypeMesto.reset();

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
    openPopup(popupProfileEdit);
    setPopupEditValue();
});

mestoAddButton.addEventListener('click', () => {
    openPopup(popupAddMesto)
});

popupCloseButton.addEventListener('click', () => closePopup(popupProfileEdit));

imagePopupCloseButton.addEventListener('click', () => closePopup(imagePopup));

popupFormTypeEdit.addEventListener('submit', handleFormSubmit);

mestoAddCloseButton.addEventListener('click', () => closePopup(popupAddMesto));

popupFormTypeMesto.addEventListener('submit', addNewCard);


const formValidatorMesto = new FormValidator (popupFormTypeMesto, settings);

formValidatorMesto.enableValidation();

const formValidatorProfile = new FormValidator (popupFormTypeEdit, settings);

formValidatorProfile.enableValidation();


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