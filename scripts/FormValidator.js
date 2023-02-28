const validationConfig = {
  formSelector: 'popup__form',
  inputSelector: 'popup__input',
  submitButtonSelector: 'popup__button_purpose_submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__span-error_active'
}

 export class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
  }

  _hasInvalidInput(inputList) {
    return inputList.some(input => {
      return !input.validity.valid;
    })
  }

  _toggleButtonState(inputList, button, inactiveButtonClass) {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add(inactiveButtonClass);
      button.setAttribute('disabled', 'disabled');
    } else {
      button.classList.remove(inactiveButtonClass);
      button.removeAttribute('disabled', 'disabled');
    }
  }

  _showInputError(form, input, errorMessage, inputErrorClass, errorClass) {
    const errorInput = form.querySelector(`.${input.id}-error`);
    input.classList.add(inputErrorClass);
    errorInput.textContent = errorMessage;
    errorInput.classList.add(errorClass);
  }

  _hideInputError(form, input, inputErrorClass, errorClass) {
    const errorInput = form.querySelector(`.${input.id}-error`);
    input.classList.remove(inputErrorClass);
    errorInput.classList.remove(errorClass);
    errorInput.textContent = '';
  }

  _checkInputValidity = function(form, input, inputErrorClass, errorClass) {
    if (!input.validity.valid) {
      this._showInputError(form, input, input.validationMessage, inputErrorClass, errorClass);
    } else {
      this._hideInputError(form, input, inputErrorClass, errorClass);
    }
  }

  _setEventListeners(form, inactiveButtonClass, submitButtonSelector, inputErrorClass, errorClass) {
    const inputList = Array.from(form.querySelectorAll('input'));
    const submitButton = form.querySelector(`.${submitButtonSelector}`);
    this._toggleButtonState(inputList, submitButton, inactiveButtonClass);
  
    inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(form, input, inputErrorClass, errorClass);
        this._toggleButtonState(inputList, submitButton, inactiveButtonClass);
      })
    })
  }

  enableValidation() {
    this._setEventListeners(this._form, this._inactiveButtonClass, this._submitButtonSelector, this._inputErrorClass, this._errorClass);
  }
}