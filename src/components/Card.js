export class Card {
  constructor(data, templateSelector, handleCardClick, popupDelete, isOwner, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes.length;
    this._popupDelete = popupDelete;
    this._isOwner = isOwner;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector);
    const cardItem = cardElement.content.querySelector('.elements__item').cloneNode(true);

    if(!this._isOwner) {
      cardItem.querySelector('.elements__delete-icon').remove();
      cardItem.isOwner = false;
    }

    return cardItem;
  }

  generateCard(isLiked) {
    this._element = this._getTemplate();

    this._isLiked = isLiked;

    this._likeButton = this._element.querySelector('.elements__favorite');
    this._cardImage = this._element.querySelector('.elements__image');

    if (this._isLiked) {
      this._likeButton.classList.add('elements__favorite_active');
    }

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.elements__name').textContent = this._name;

    this._element.querySelector('.elements__like-counter').textContent = this._likes; 

    return this._element;
  }

  _likeCard() {
    this._likeButton.classList.toggle('elements__favorite_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _openDeleteCardForm() {
    this._popupDelete.open();
    this._popupDelete.cardId = this._id;
    this._popupDelete.Card = this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeCard();
      this._handleLikeClick();
    })

    if (this._isOwner) {
      this._element.querySelector('.elements__delete-icon').addEventListener('click', () => {
        this._openDeleteCardForm();
      })
    }

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    })
  }
}