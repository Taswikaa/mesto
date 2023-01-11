const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__button_purpose_close');
const popupSubmitButton = document.querySelector('.popup__button_purpose_submit');
const popupForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input-name');
const jobInput = document.querySelector('.popup__input-job');
const pageName = document.querySelector('.profile__name');
const pageJob = document.querySelector('.profile__job');

const handleFormSubmit = function(e) {
  e.preventDefault();

  let formName = nameInput.value;
  let formJob = jobInput.value;
  
  pageName.textContent = `${formName}`;
  pageJob.textContent = `${formJob}`;

  popup.classList.remove('popup_opened');
}

popupOpenButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');
})

popupCloseButton.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
})

popupSubmitButton.addEventListener('click', handleFormSubmit);