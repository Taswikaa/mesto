const popup = document.querySelector('.popup');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__button_purpose_close');
const popupForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_pupose_name');
const jobInput = document.querySelector('.popup__input_pupose_job');
const pageName = document.querySelector('.profile__name');
const pageJob = document.querySelector('.profile__job');

const closePopup = function() {
  popup.classList.remove('popup_opened');
}

const handleFormSubmit = function(e) {
  e.preventDefault();

  let formName = nameInput.value;
  let formJob = jobInput.value;
  
  pageName.textContent = `${formName}`;
  pageJob.textContent = `${formJob}`;

  closePopup();
}

popupEditButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');
  pageName.textContent = nameInput.value;
  pageJob.textContent = jobInput.value;
})

popupCloseButton.addEventListener('click', closePopup);

popupForm.addEventListener('submit', handleFormSubmit);