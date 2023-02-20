const validationConfig = {
  formSelector: 'popup__form',
  inputSelector: 'popup__input',
  submitButtonSelector: 'popup__button_purpose_submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__span-error_active'
}

const hasInvalidInput = function(inputList) {
  return inputList.some(input => {
    return !input.validity.valid;
  })
}

const toggleButtonState = function(inputList, button, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled', 'disabled');
  } else {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled', 'disabled');
  }
}

const setEventListeners = function(form, inactiveButtonClass, submitButtonSelector, inputErrorClass, errorClass) {
  const inputList = Array.from(form.querySelectorAll('input'));
  const submitButton = form.querySelector(`.${submitButtonSelector}`);
  toggleButtonState(inputList, submitButton, inactiveButtonClass);

  inputList.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, inputErrorClass, errorClass);
      toggleButtonState(inputList, submitButton, inactiveButtonClass);
    })
  })
}

const showInputError = function(form, input, errorMessage, inputErrorClass, errorClass) {
  const errorInput = form.querySelector(`.${input.id}-error`);
  input.classList.add(inputErrorClass);
  errorInput.textContent = errorMessage;
  errorInput.classList.add(errorClass);
}

const hideInputError = function(form, input, inputErrorClass, errorClass) {
  const errorInput = form.querySelector(`.${input.id}-error`);
  input.classList.remove(inputErrorClass);
  errorInput.classList.remove(errorClass);
  errorInput.textContent = '';
}

const checkInputValidity = function(form, input, inputErrorClass, errorClass) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(form, input, inputErrorClass, errorClass);
  }
}

const enableValidation = function(formsElemenstsList) {
  const formList = Array.from(document.querySelectorAll(`.${formsElemenstsList.formSelector}`));
  
  formList.forEach(form => {
    setEventListeners(form, formsElemenstsList.inactiveButtonClass, formsElemenstsList.submitButtonSelector, formsElemenstsList.inputErrorClass, formsElemenstsList.errorClass);
  })
}

enableValidation(validationConfig);