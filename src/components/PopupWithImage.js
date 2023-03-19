import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(link, name) {
    super.open();

    this._popup.querySelector('.popup__img').src = link;
    this._popup.querySelector('.popup__img').alt = name;
    this._popup.querySelector('.popup__text').textContent = name;
  }
}