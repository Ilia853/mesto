import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { settings } from '../constants/settingsForValidation.js';
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { api } from '../components/Api.js';
import { PopupDelCard } from '../components/PopupDelCard.js';
import { profileEditButton, avatarImage, nameInput, jobInput, popupFormTypeEdit, popupFormTypeMesto, popupFormTypeAvatar,
        mestoAddButton, mestoAddCloseButton } from '../constants/variables.js';

let profileId;

Promise.all([api.getProfile(), api.getInitialCards()])
    .then(([user, cards]) => {
        userInfo.setUserInfo(user);
        profileId = user._id;
        cardList.renderItems(cards);
    })
    .catch(err => {
        console.log('initialData ', err);
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
            deleteCard.deleteFormSubmit(() => {
                api.delImage(imageId)
                    .then(cardId => {
                        card.delImage(cardId)
                        deleteCard.close()
                    })
                    .catch(err => {
                        console.log('delImage', err);
                    })
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
        cardList.addInitaialItems(cardElement);
    }},
    '.elements__list'
)

const newCard = new PopupWithForm ({
    popupSelector: '.popup_type_mesto', 
    handleFormSubmit: (item) => {
        api.addImage(item.name, item.link, item.likes)
            .then(res => {
                const cardElementNew = renderCard(res)
                cardList.addItem(cardElementNew)
                newCard.close()
            })
            .catch(err => {
                console.log('addImage', err);
            })
            .finally(() =>
                newCard.renderLoading('Создать')
            )
            newCard.renderLoading('Сохранение...')
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
                userInfo.setUserInfo(userData);
                changeUserInfo.close();
            })
            .catch(err => {
                console.log('editProfile', err);
            })
            .finally(() =>
                changeUserInfo.renderLoading('Сохранить')
            )
            changeUserInfo.renderLoading('Сохранение...')

    }
})

changeUserInfo.setEventListeners();

const deleteCard = new PopupDelCard ({
    popupSelector: '.popup_type_delete-card'
})

deleteCard.setEventListeners();

const changeAvatar = new PopupWithForm ({
    popupSelector: '.popup_type_avatar',
    handleFormSubmit: (userData) => {
        api.changeAvatar(userData.avatar)
            .then(userData => {
                userInfo.setUserInfo(userData);
                changeAvatar.close();
            })
            .catch(err => {
                console.log('changeAvatar', err);
            })
            .finally(() =>
                changeAvatar.renderLoading('Сохранить')
            )
            changeAvatar.renderLoading('Сохранение...')
        }
    }
)

changeAvatar.setEventListeners();

avatarImage.addEventListener('click', () => {
    formValidatorAvatar.disableButton();
    changeAvatar.open();
})

profileEditButton.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.about;
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