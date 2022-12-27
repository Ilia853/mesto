import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { settings } from '../constants/settingsForValidation.js';
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { api } from '../components/Api.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const avatarImage = document.querySelector('.profile__image_overlay');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const popupFormTypeEdit = document.querySelector('.popup__form_type_edit');
const popupFormTypeMesto = document.querySelector('.popup__form_type_mesto');
const popupFormTypeAvatar = document.querySelector('.popup__form_type_avatar');
const mestoAddButton = document.querySelector('.profile__add-button');
const mestoAddCloseButton = document.querySelector('.popup__close-button_type_mesto');

let profileId;

api.getProfile()
    .then(res => {
        userInfo.setUserInfo(res)
        profileId = res._id;
    })
    .catch(err => {
        console.log('getProfile', err)
    });

api.getInitialCards()
    .then(res => {
        cardList.renderItems(res)
    })
    .catch(err => {
        console.log('getInitialCards', err);
    })

const popupWithImage = new PopupWithImage ('.image-popup');

popupWithImage.setEventListeners();

function renderCard (item) {
    const card = new Card({
        data: item,
        handleCardClick: () => {
            popupWithImage.open(item.name, item.link);
        },
        handleCardDelete: (imageId) => {
            deleteCard.open();
            deleteCard.changeHandleFormSubmit(() => {
                api.delImage(imageId)
                    .then(res => {
                        deleteCard.close()
                    })
                    .catch(err => {
                        console.log('delImage', err);
                    })
                    .finally(
                        card.delImage()
                    )
            })
        },
        handleCardLike: (imageId ) => {
            if (card.isLiked()) {
                api.delLike(imageId)
                .then(res => {
                    card.setLikes(res.likes)
                })
                .catch(err => {
                    console.log('delLike', err);
                })
            } else {
                api.addLike(imageId)
                .then(res => {
                    card.setLikes(res.likes)
                })
                .catch(err => {
                    console.log('addLike', err);
                })
            }
        }
    },
    '.card-element',
    profileId);

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

const newCard = new PopupWithForm ({
    popupSelector: '.popup_type_mesto', 
    handleFormSubmit: (item) => {
        api.addImage(item.name, item.link, item.likes)
            .then(res => {
                newCard.renderLoading('Создать')
                const cardElementNew = renderCard(res)
                cardList.addItem(cardElementNew)
                newCard.close();
            })
            .catch(err => {
                console.log('addImage', err);
            })
            .finally(
                newCard.renderLoading('Сохранение...')
            )
    }
})

newCard.setEventListeners();

const userInfo = new UserInfo ({
    userTitle: '.profile__title',
    userSubtitle: '.profile__subtitle',
    userAvatar: '.profile__image'
})

const changeUserInfo = new PopupWithForm ({
    popupSelector: '.popup_type_edit',
    handleFormSubmit: (userData) => {
        api.editProfile(userData.name, userData.about)
            .then(userData => {
                changeUserInfo.renderLoading('Сохранить')
                userInfo.setUserInfo(userData);
                changeUserInfo.close();
            })
            .catch(err => {
                console.log('editProfile', err);
            })
            .finally(
                changeUserInfo.renderLoading('Сохранение...')
            )
    }
})

changeUserInfo.setEventListeners();

const deleteCard = new PopupWithForm ({
    popupSelector: '.popup_type_delete-card'
})

deleteCard.setEventListeners();

const changeAvatar = new PopupWithForm ({
    popupSelector: '.popup_type_avatar',
    handleFormSubmit: (userData) => {
        api.changeAvatar(userData.avatar)
            .then(userData => {
                changeAvatar.renderLoading('Сохранить')
                userInfo.setUserInfo(userData);
                changeAvatar.close();
            })
            .catch(err => {
                console.log('changeAvatar', err);
            })
            .finally(
                changeAvatar.renderLoading('Сохранение...')
            )
        }
    }
)

changeAvatar.setEventListeners();

avatarImage.addEventListener('click', () => {
    formValidatorAvatar.disableButton();
    changeAvatar.open();
})

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

const formValidatorAvatar = new FormValidator (popupFormTypeAvatar, settings);

formValidatorAvatar.enableValidation();