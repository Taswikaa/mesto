import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);

    this._callback = callback;

    this._form = this._popup.querySelector('form');
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', this._callback);
  }
}