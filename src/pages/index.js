import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../constants/cards.js';
import { settings } from '../constants/settingsForValidation.js';
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { api } from '../components/Api.js';

api.getProfile()
    .then(res => {
        console.log(res);
        userInfo.setUserInfo(res)
    })
    .catch(console.log);

api.getInitialCards()
    .then(res => {
        console.log(res);
        cardList.renderItems(res)
    })

const profileEditButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const popupFormTypeEdit = document.querySelector('.popup__form_type_edit');
const popupFormTypeMesto = document.querySelector('.popup__form_type_mesto');
const mestoAddButton = document.querySelector('.profile__add-button');
const mestoAddCloseButton = document.querySelector('.popup__close-button_type_mesto');

const popupWithImage = new PopupWithImage ('.image-popup');

popupWithImage.setEventListeners();

function renderCard (item) {
    const card = new Card({
        data: item,
        handleCardClick: () => {
            popupWithImage.open(item.name, item.link);
        }
    },
    '.card-element');

    const cardElement = card.createCard();

    return cardElement;
}

const cardList = new Section ({
    renderer: (item) => {
        const cardElement = renderCard(item);
        cardList.addItem(cardElement);
    }},
    '.elements__list'
)

// cardList.renderItems(initialCards);

const newCard = new PopupWithForm ({
    popupSelector: '.popup_type_mesto', 
    handleFormSubmit: (item) => {

        api.addImage(item.name, item.link, item.likes)
            .then(res => {
                console.log('res', res);
                const cardElementNew = renderCard(res)
                cardList.addItem(cardElementNew)
            })
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
        api.editProfile(userData.name, userData.about)
            .then(userData => {
                userInfo.setUserInfo(userData);
            })
    }
})

changeUserInfo.setEventListeners();

profileEditButton.addEventListener('click', () => {
    nameInput.value = userInfo.getUserInfo().name;
    jobInput.value = userInfo.getUserInfo().about;
    changeUserInfo.open();
})

mestoAddButton.addEventListener('click', () => {
    formValidatorMesto.disableButton();
    newCard.open();
})
mestoAddCloseButton.addEventListener('click', () => {
    formValidatorMesto.disableButton();
})

const formValidatorMesto = new FormValidator (popupFormTypeMesto, settings);

formValidatorMesto.enableValidation();

const formValidatorProfile = new FormValidator (popupFormTypeEdit, settings);

formValidatorProfile.enableValidation();