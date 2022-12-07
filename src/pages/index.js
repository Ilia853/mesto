import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../constants/cards.js';
import { settings } from '../constants/settingsForValidation.js';
import { Section } from '../components/Section.js'
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button_type_edit');
const imagePopupCloseButton = document.querySelector('.image-popup__close-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const popupFormTypeEdit = document.querySelector('.popup__form_type_edit');
const popupFormTypeMesto = document.querySelector('.popup__form_type_mesto');
const mestoAddButton = document.querySelector('.profile__add-button');
const mestoAddCloseButton = document.querySelector('.popup__close-button_type_mesto');

function renderCard (item) {
    const card = new Card({
        data: item,
        handleCardClick: () => {
            popupWithImage.zoomImage(item.name, item.link);
        }
    },
    '.card-element');

    const cardElement = card.createCard();

    return cardElement;
}

const cardList = new Section ({
    items: initialCards,
    renderer: (item) => {
        const cardElement = renderCard(item);
        cardList.addItem(cardElement);
    }},
    '.elements__list'
)

cardList.renderItems();

const newCard = new PopupWithForm ({
    popupSelector: '.popup_type_mesto', 
    handleFormSubmit: (item) => {
        const cardElementNew = renderCard(item);
        cardList.addItem(cardElementNew);
    }
})

newCard.setEventListeners();

const userInfo = new UserInfo ({
    userTitle: '.profile__title',
    userSubtitle: '.profile__subtitle'
})

const changeUserInfo = new PopupWithForm ({
    popupSelector: '.popup_type_edit',
    handleFormSubmit: (userData) => {
        userInfo.setUserInfo(userData);
    }
})

changeUserInfo.setEventListeners();

const popupWithImage = new PopupWithImage ('.image-popup');

const openProfilePopup = new Popup ('.popup_type_edit');
profileEditButton.addEventListener('click', () => {
    nameInput.value = userInfo.getUserInfo().userName;
    jobInput.value = userInfo.getUserInfo().userJob;
    openProfilePopup.open();
})
popupCloseButton.addEventListener('click', () => {
    openProfilePopup.setEventListeners();
})

const openAddMestoPopup = new Popup ('.popup_type_mesto');
mestoAddButton.addEventListener('click', () => {
    formValidatorMesto.disableButton();
    openAddMestoPopup.open();
})
mestoAddCloseButton.addEventListener('click', () => {
    openAddMestoPopup.setEventListeners();
    formValidatorMesto.disableButton();
})

const closeImagePopup = new Popup ('.image-popup');
imagePopupCloseButton.addEventListener('click', () => {
    closeImagePopup.setEventListeners();
})

const formValidatorMesto = new FormValidator (popupFormTypeMesto, settings);

formValidatorMesto.enableValidation();

const formValidatorProfile = new FormValidator (popupFormTypeEdit, settings);

formValidatorProfile.enableValidation();