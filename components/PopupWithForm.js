import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);

    this._callback = callback;

    this._form = this._popup.querySelector('form');
    this._inputs = [...this._popup.querySelectorAll('input')];
  }

  _getInputValues() {

  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', this._callback);
  }

  open() {
    super.open();

    console.log(this._popup);
    console.log(this._callback);
  }

  close() {
    super.close();
  }
}