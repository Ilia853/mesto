export class Card {

    constructor ({data, handleCardClick, handleCardDelete, handleCardLike}, templateSelector, profileId) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleCardLike = handleCardLike;
        this._profileId = profileId;
    }

    _getCard () {
        const card = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

        return card;
    }

    isLiked () {
        const isCardLiked = this._data.likes.find(user => user._id === this._profileId)

        return isCardLiked;
    }

    setLikes (likeAmount) {
        this._data.likes = likeAmount;
        this._likeScore = this._element.querySelector('.element__like-score');
        this._likeScore.textContent = this._data.likes.length;

        
        if (this.isLiked()) {
            this._blackHeart();
        } else {
            this._whiteHeart();
        }
    }

    createCard () {
        this._element = this._getCard();
        this._cardImage = this._element.querySelector('.element__image');

        this._setEventLiteners();

        this._cardImage.src = this._data.link;
        this._element.querySelector('.element__title').textContent = this._data.name;
        this._cardImage.alt = this._data.name;

        this.setLikes(this._data.likes);

        if (this._data.owner._id !== this._profileId) {
            this._element.querySelector('.element__del-button').style.display = 'none'
        }

        return this._element;
    }

    _setEventLiteners () {
        this._likeButton = this._element.querySelector('.element__like-button');

        this._likeButton.addEventListener('click', () => {
            this._handleCardLike(this._data._id);
        });

        this._element.querySelector('.element__del-button').addEventListener('click', () => {
            this._handleCardDelete(this._data._id);
        })

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick();
        })
    }

    _blackHeart () {
        this._likeButton.classList.add('element__like-button_active');
    }

    _whiteHeart () {
        this._likeButton.classList.remove('element__like-button_active');
    }

    delImage () {
        this._element.remove();
        this._element = null;
    }
}
