import { openPopup, popupImageImg, popupImageText, popupImage } from "./index.js";

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector);
    const cardItem = cardElement.content.querySelector('.elements__item').cloneNode(true);

    return cardItem;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._element.querySelector('.elements__image').src = this._image;
    this._element.querySelector('.elements__name').textContent = this._name;

    return this._element;
  }

  _likeCard() {
    this._element.querySelector('.elements__favorite').classList.toggle('elements__favorite_active');
  }

  _deleteCard() {
    this._element.querySelector('.elements__delete-icon').closest('.elements__item').remove();
  }

  _openCard() {
    popupImageImg.src = this._image;
    popupImageText.textContent = this._name;
    openPopup(popupImage);
  }

  _setEventListeners() {
    this._element.querySelector('.elements__favorite').addEventListener('click', () => {
      this._likeCard();
    })

    this._element.querySelector('.elements__delete-icon').addEventListener('click', () => {
      this._deleteCard();
    })

    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._openCard();
    })
  }
}