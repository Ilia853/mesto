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
  }
];

const selectors = {
popupElementEdit: '.popup_type_edit',
popupElementMesto: '.popup_type_mesto',
profileEditButton: '.profile__edit-button',
profileMestoButton: '.profile__add-button',
profileName: '.profile__title',
profileJob: '.profile__subtitle',
formElementProfile: '.popup__form_type_edit',
formElementMesto: '.popup__form_type_mesto',
nameInput: '.popup__input_type_name',
jobInput: '.popup__input_type_job',
mestoInput: '.popup__input_type_mesto',
linkInput: '.popup__input_type_link',
profileEditCloseButton: '.popup__close-button_type_edit',
profileMestoCloseButton: '.popup__close-button_type_mesto',
template: '#card-element',
elementsList: '.elements__list',
elementTitle: '.element__title',
elementImage: '.element__image',
elementLikeButton: '.element__like-button',
elementDelButton: '.element__del-button',
imagePopup: '.image-popup',
imageCloseButton: '.image-popup__close-button',
imagePopupPic: '.image-popup__pic',
imagePopupTitle: '.image-popup__title',
cardElement: '.element',
popup: '.popup'
};

const popupElementEdit = document.querySelector(selectors.popupElementEdit);
const popupElementMesto = document.querySelector(selectors.popupElementMesto);
const profileEditButton = document.querySelector(selectors.profileEditButton);
const profileMestoButton = document.querySelector(selectors.profileMestoButton);
const profileName = document.querySelector(selectors.profileName);
const profileJob = document.querySelector(selectors.profileJob);
const formElementProfile = document.querySelector(selectors.formElementProfile);
const formElementMesto = document.querySelector(selectors.formElementMesto);
const nameInput = document.querySelector(selectors.nameInput);
const jobInput = document.querySelector(selectors.jobInput);
const mestoInput = document.querySelector(selectors.mestoInput);
const linkInput = document.querySelector(selectors.linkInput);
const profileEditCloseButton = document.querySelector(selectors.profileEditCloseButton);
const profileMestoCloseButton = document.querySelector(selectors.profileMestoCloseButton);
const template = document.querySelector(selectors.template).content.children[0];
const elementsList = document.querySelector(selectors.elementsList);
const imagePopup = document.querySelector(selectors.imagePopup);
const imageCloseButton = document.querySelector(selectors.imageCloseButton);
const imagePopupPic = document.querySelector(selectors.imagePopupPic);
const imagePopupTitle = document.querySelector(selectors.imagePopupTitle);
const elementImage = document.querySelector(selectors.elementImage);
const cardElement = document.querySelector(selectors.cardElement);

function createCard (name, link) {

  const elementForm = template.cloneNode(true);
  const elementTitle = elementForm.querySelector(selectors.elementTitle);
  const elementImage = elementForm.querySelector(selectors.elementImage);

  elementTitle.textContent = name;
  elementImage.src = link;
  elementImage.alt = name;

  setEventListeners(elementForm);

  return elementForm;
};

function setEventListeners (element) {

  const elementLikeButton = element.querySelector(selectors.elementLikeButton);
  elementLikeButton.addEventListener('click', () => changeLike(elementLikeButton));

  const elementImage = element.querySelector(selectors.elementImage);
  elementImage.addEventListener('click', zoomImage);

  const elementDelButton = element.querySelector(selectors.elementDelButton);
  elementDelButton.addEventListener('click', delImage);

  imageCloseButton.addEventListener('click', () => closePopup(imagePopup));
};

function zoomImage (event) {
  const currentElement = event.target.closest(selectors.cardElement);
  const currentElementTitle = currentElement.querySelector(selectors.elementTitle);
  const currentElementImage = currentElement.querySelector(selectors.elementImage);
  imagePopupPic.src = currentElementImage.src;
  imagePopupTitle.textContent = currentElementTitle.textContent;
  imagePopupPic.alt = currentElementTitle.textContent;
  openPopup(imagePopup);
};

function delImage (event) {
  const currentElement = event.target.closest(selectors.cardElement);
  currentElement.remove();
};

function changeLike (type) {
  type.classList.toggle('element__like-button_active');
};

function renderCards () {
  const list = initialCards.map(value => createCard(value.name, value.link));
  elementsList.prepend(...list);
};

renderCards ();

function addNewCard (evt) {
  evt.preventDefault();
  const card = createCard(mestoInput.value, linkInput.value);
  elementsList.prepend(card);
  mestoInput.value = '';
  linkInput.value = '';
  closePopup(popupElementMesto);
};

function setPopupEditValue () {
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileJob.textContent.trim();
};

function changePopupValue () {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
};

function handleFormSubmit (evt) {
  evt.preventDefault ();
  changePopupValue ();
  closePopup (popupElementEdit);
};

function closePopup (type) {
  type.classList.remove('image-popup_opened');
};

function openPopup(type) {
  type.classList.add('image-popup_opened');
};

profileEditButton.addEventListener('click', () => {
  openPopup(popupElementEdit);
  setPopupEditValue();
});

profileMestoButton.addEventListener('click', () => openPopup(popupElementMesto));

profileEditCloseButton.addEventListener('click', () => closePopup(popupElementEdit));

profileMestoCloseButton.addEventListener('click', () => closePopup(popupElementMesto));

formElementProfile.addEventListener('submit', handleFormSubmit);

formElementMesto.addEventListener('submit', addNewCard);

function closeViaEsc (evt) {
  const openedPopup = Array.from(document.querySelectorAll('.image-popup_opened'));

  if (evt.keyCode == 27) {
    openedPopup.forEach(closePopup);
  };
};

document.addEventListener('keydown', closeViaEsc);

function closeViaOverlay (evt) {

  if (evt.target.classList.contains('popup')) {
    const currentPopup = evt.target.closest('.popup');
    closePopup(currentPopup);
  };
};

document.addEventListener('click', closeViaOverlay);