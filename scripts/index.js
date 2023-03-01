import { initialCards, validationConfig } from "./data.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const elementsList = document.querySelector('.elements__wrapper');

const popupEdit = document.querySelector('.popup_edit');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupEditForm = popupEdit.querySelector('.popup__form');
const nameInput = popupEdit.querySelector('.popup__input_pupose_name');
const jobInput = popupEdit.querySelector('.popup__input_pupose_job');
const pageName = document.querySelector('.profile__name');
const pageJob = document.querySelector('.profile__job');

const popupAdd = document.querySelector('.popup_add');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddOpenButton = document.querySelector('.profile__add-button');;
const placeInput = popupAdd.querySelector('.popup__input_pupose_place');
const urlInput = popupAdd.querySelector('.popup__input_pupose_url');

const popupImage = document.querySelector('.popup_image');
const popupImageImg = popupImage.querySelector('.popup__img');
const popupImageText = popupImage.querySelector('.popup__text');

const closePopupButtons = Array.from(document.querySelectorAll('.popup__button_purpose_close'))

const popupList = Array.from(document.querySelectorAll('.popup'));

const validatorAddForm = new FormValidator(validationConfig, popupAddForm);

const validatorEditForm = new FormValidator(validationConfig, popupEditForm);

const validatorFormList = [validatorAddForm, validatorEditForm];

const closePopupByOuterClick = function(evt, popup) {
  if (evt.target.classList.contains('popup')) {
    closePopup(popup);
  }
}

popupList.forEach(popup => {
  popup.addEventListener('click', evt => {
    closePopupByOuterClick(evt, popup);
  })
})

const closePopupByPressEnter = function(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

const openPopup = function(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByPressEnter);
}

const closePopup = function(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByPressEnter);
}

closePopupButtons.forEach(button => {
  button.addEventListener('click', () => {
    closePopup(button.closest('.popup'))
  })
})

const submitEditProfileForm = function(e) {
  e.preventDefault();

  const formName = nameInput.value;
  const formJob = jobInput.value;
  
  pageName.textContent = formName;
  pageJob.textContent = formJob;
  closePopup(popupEdit);
}

const handleCardClick = function(name, link) {
  popupImageImg.src = link;
  popupImageText.textContent = name;
  popupImageImg.alt = name;
  openPopup(popupImage);
}

const createCard = function(data) {
  return new Card(data, '#elements-template', handleCardClick);
}

validatorFormList.forEach(validator => {
  validator.enableValidation();
})

initialCards.forEach(el => {
  elementsList.append(createCard(el).generateCard());
})

popupEditOpenButton.addEventListener('click', function() {
  openPopup(popupEdit);
  nameInput.value = pageName.textContent;
  jobInput.value = pageJob.textContent;

  validatorEditForm.resetValidation();
})

popupEditForm.addEventListener('submit', submitEditProfileForm);

popupAddOpenButton.addEventListener('click', () => {
  openPopup(popupAdd);
});

popupAddForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const cardData = {
    link: urlInput.value,
    name: placeInput.value
  } 

  elementsList.prepend(createCard(cardData).generateCard());

  popupAddForm.reset();
  validatorAddForm.disableSubmitButton();


  closePopup(popupAdd);
})