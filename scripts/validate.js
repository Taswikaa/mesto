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

const toggleButtonState = function(inputList, button) {
  if (hasInvalidInput(inputList)) {
    button.classList.add(validationConfig.inactiveButtonClass);
    button.setAttribute('disabled', 'disabled');
  } else {
    button.classList.remove(validationConfig.inactiveButtonClass);
    button.removeAttribute('disabled', 'disabled');
  }
}

const setEventListeners = function(form) {
  const inputList = Array.from(form.querySelectorAll('input'));
  const submitButton = form.querySelector(`.${validationConfig.submitButtonSelector}`);
  toggleButtonState(inputList, submitButton);

  inputList.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input);
      toggleButtonState(inputList, submitButton);
    })
  })
}

const showInputError = function(form, input, errorMessage) {
  const errorInput = form.querySelector(`.${input.id}-error`);
  input.classList.add(validationConfig.inputErrorClass);
  errorInput.textContent = errorMessage;
  errorInput.classList.add(validationConfig.errorClass);
}

const hideInputError = function(form, input) {
  const errorInput = form.querySelector(`.${input.id}-error`);
  input.classList.remove(validationConfig.inputErrorClass);
  errorInput.classList.remove(validationConfig.errorClass);
  errorInput.textContent = '';
}

const checkInputValidity = function(form, input) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
}

const enableValidation = function(formsElemenstsList) {
  const formList = Array.from(document.querySelectorAll(`.${formsElemenstsList.formSelector}`));
  
  formList.forEach(form => {
    setEventListeners(form);
  })
}

enableValidation(validationConfig);