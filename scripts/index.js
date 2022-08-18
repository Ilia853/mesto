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
  formElement: '.popup__form',
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
  imageCloseButton: '.popup__close-button_type_image',
  imagePopupPic: '.image-popup__pic',
  imagePopupTitle: '.image-popup__title',
};

const popupElementEdit = document.querySelector(selectors.popupElementEdit);
const popupElementMesto = document.querySelector(selectors.popupElementMesto);
const profileEditButton = document.querySelector(selectors.profileEditButton);
const profileMestoButton = document.querySelector(selectors.profileMestoButton);
const profileName = document.querySelector(selectors.profileName);
const profileJob = document.querySelector(selectors.profileJob);
const formElement = document.querySelector(selectors.formElement);
const formElementMesto = document.querySelector(selectors.formElementMesto);
const nameInput = document.querySelector(selectors.nameInput);
const jobInput = document.querySelector(selectors.jobInput);
const mestoInput = document.querySelector(selectors.mestoInput);
const linkInput = document.querySelector(selectors.linkInput);
const profileEditCloseButton = document.querySelector(selectors.profileEditCloseButton);
const profileMestoCloseButton = document.querySelector(selectors.profileMestoCloseButton);
const template = document.querySelector(selectors.template).content.children[0];
const elementsList = document.querySelector(selectors.elementsList);
const elementDelButton = document.querySelector(selectors.elementDelButton);

function createCards (value) {
  const createElement = template.cloneNode(true);
  const elementTitle = createElement.querySelector(selectors.elementTitle);
  const elementImage = createElement.querySelector(selectors.elementImage);

  elementTitle.textContent = value.name;
  elementImage.src = value.link;

  elementsList.append(createElement);

  const elementLikeButton = createElement.querySelector(selectors.elementLikeButton);

  function changeLike (type) {
    type.classList.toggle('element__like-button_active');
  };

  elementLikeButton.addEventListener('click', () => changeLike(elementLikeButton));

  const imagePopup = document.querySelector(selectors.imagePopup);
  const imageCloseButton = document.querySelector(selectors.imageCloseButton);
  const imagePopupPic = document.querySelector(selectors.imagePopupPic);
  const imagePopupTitle = document.querySelector(selectors.imagePopupTitle);

  function openImagePopup (type) {
    type.classList.add('image-popup_opened');

    imagePopupTitle.textContent = value.name;
    imagePopupPic.src = value.link;
  };

  function closePopupImage (type) {
    type.classList.remove('image-popup_opened');
  };

  elementImage.addEventListener('click', () => openImagePopup(imagePopup));
  imageCloseButton.addEventListener('click', () => closePopupImage(imagePopup));
};

function createInitialCards () {
  initialCards.map(createCards);
};

createInitialCards ();

function createNewCard () {
  const createElement = template.cloneNode(true);
  const elementTitle = createElement.querySelector(selectors.elementTitle);
  const elementImage = createElement.querySelector(selectors.elementImage);

  elementTitle.textContent = mestoInput.value;
  elementImage.src = linkInput.value;

  elementsList.prepend(createElement);

  const elementLikeButton = createElement.querySelector(selectors.elementLikeButton);

  function changeLike (type) {
    type.classList.toggle('element__like-button_active');
    console.log('click');
  };

  elementLikeButton.addEventListener('click', () => changeLike(elementLikeButton));

  const imagePopup = document.querySelector(selectors.imagePopup);
  const imageCloseButton = document.querySelector(selectors.imageCloseButton);
  const imagePopupPic = document.querySelector(selectors.imagePopupPic);
  const imagePopupTitle = document.querySelector(selectors.imagePopupTitle);

  function openImagePopup (type) {
    type.classList.add('image-popup_opened');

    imagePopupTitle.textContent = mestoInput.value;
    imagePopupPic.src = linkInput.value;
  };

  function closePopupImage (type) {
    type.classList.remove('image-popup_opened');
  };

  elementImage.addEventListener('click', () => openImagePopup(imagePopup));
  imageCloseButton.addEventListener('click', () => closePopupImage(imagePopup));
};

function addNewCard (evt) {
  evt.preventDefault ();
  createNewCard ();
  closePopup(popupElementMesto);
}
 
function setPopupMestoValue () {
  mestoInput.value = 'Название';
  linkInput.value = 'Ссылка на картинку';
};

function setPopupEditValue () {
    nameInput.value = profileName.textContent.trim();
    jobInput.value = profileJob.textContent.trim();
};

function changePopupValue () {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
};

function formSubmitHandler (evt) {
    evt.preventDefault ();
    changePopupValue ();
    closePopup (popupElementEdit);
};

function closePopup (type) {
    type.classList.remove('popup_opened');
};

function openPopup(type) {
    type.classList.add('popup_opened');
}

profileEditButton.addEventListener('click', () => openPopup(popupElementEdit), setPopupEditValue());

profileMestoButton.addEventListener('click', () => openPopup(popupElementMesto), setPopupMestoValue());

profileEditCloseButton.addEventListener('click', () => closePopup(popupElementEdit));

profileMestoCloseButton.addEventListener('click', () => closePopup(popupElementMesto));

formElement.addEventListener('submit', formSubmitHandler);

formElementMesto.addEventListener('submit', addNewCard);

elementsList.addEventListener('click', function(el){
  
  let target = el.target;
  
  if(target.classList.contains('element__del-button')){
    let currentElement = target.closest('.element');
    currentElement.remove(); 
  };
});