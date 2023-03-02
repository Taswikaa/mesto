export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector);
    const cardItem = cardElement.content.querySelector('.elements__item').cloneNode(true);

    return cardItem;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._likeButton = this._element.querySelector('.elements__favorite');
    this._cardImage = this._element.querySelector('.elements__image');

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.elements__name').textContent = this._name;

    return this._element;
  }

  _likeCard() {
    this._likeButton.classList.toggle('elements__favorite_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    })

    this._element.querySelector('.elements__delete-icon').addEventListener('click', () => {
      this._deleteCard();
    })

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  }
}