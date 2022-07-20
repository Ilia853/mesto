let popupElement = document.querySelector(".popup");
let profileEditButton = document.querySelector(".profile__edit-button");
let profileName = document.querySelector(".profile__title");
let profileJob = document.querySelector(".profile__subtitle");
let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__form-name");
let jobInput = document.querySelector(".popup__form-job");
let profileCloseButton = document.querySelector(".popup__close-button");

function setPopupFirstValue () {
    nameInput.value = profileName.textContent.trim();
    jobInput.value = profileJob.textContent.trim();
};

function changePopupValue () {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
};

function formSubmitHandler (evt) {
    evt.preventDefault ()
    changePopupValue ();
    closePopup ();
};

function closePopup () {
    popupElement.classList.remove("popup_opened");
};

profileEditButton.addEventListener('click', function openPopup () {
    popupElement.classList.add("popup_opened");
    setPopupFirstValue ();
});

profileCloseButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);