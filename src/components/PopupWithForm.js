import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);

    this._callback = callback;

    this._inputs = [...this._popup.querySelectorAll('input')];

    this._form = this._popup.querySelector('form');
  }

  setEventListeners() {
    super.setEventListeners();

    
    this._form.addEventListener('submit', (evt) => {
      this._callback(evt, this._getInputValues());
    });
  }

  _getInputValues() {
    const inputValues = {};

    this._inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  close() {
    super.close();

    this._form.reset();
  }
}