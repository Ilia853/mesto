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

import {Card} from './Card.js'

const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupCloseButton = document.querySelector('.popup__close-button_type_edit');


initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, '.card-element');
    const cardElement = card.createCard();
    const elementsList = document.querySelector('.elements__list');

    elementsList.prepend(cardElement);
})

export function openPopup(type) {
    type.classList.add('image-popup_opened');
}

function closePopup(type) {
    type.classList.remove('image-popup_opened');
}

profileEditButton.addEventListener('click', () => openPopup(popupProfileEdit));

popupCloseButton.addEventListener('click', () => closePopup(popupProfileEdit));