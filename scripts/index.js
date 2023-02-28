import { initialCards, validationConfig } from "./data.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const elementsList = document.querySelector('.elements__wrapper');

const formsList = Array.from(document.querySelectorAll('.popup__form'));

const popupEdit = document.querySelector('.popup_edit');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupEditCloseButton = popupEdit.querySelector('.popup__button_purpose_close');
const popupEditForm = popupEdit.querySelector('.popup__form');
const nameInput = popupEdit.querySelector('.popup__input_pupose_name');
const jobInput = popupEdit.querySelector('.popup__input_pupose_job');
const pageName = document.querySelector('.profile__name');
const pageJob = document.querySelector('.profile__job');

const popupAdd = document.querySelector('.popup_add');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = popupAdd.querySelector('.popup__button_purpose_close');
const popupAddSubmitButton = popupAdd.querySelector('.popup__button_purpose_submit');
const placeInput = popupAdd.querySelector('.popup__input_pupose_place');
const urlInput = popupAdd.querySelector('.popup__input_pupose_url');

const popupImage = document.querySelector('.popup_image');
const popupImageImg = popupImage.querySelector('.popup__img');
const popupImageText = popupImage.querySelector('.popup__text');
const buttonCloseImagePopup = popupImage.querySelector('.popup__button_purpose_close');

const popupList = Array.from(document.querySelectorAll('.popup'));

initialCards.forEach(el => {
  const card = new Card(el, '#elements-template');
  elementsList.append(card.generateCard());
})

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

const submitEditProfileForm = function(e) {
  e.preventDefault();

  const formName = nameInput.value;
  const formJob = jobInput.value;
  
  pageName.textContent = formName;
  pageJob.textContent = formJob;
  closePopup(popupEdit);
}

popupEditOpenButton.addEventListener('click', function() {
  openPopup(popupEdit);
  nameInput.textContent = pageName.textContent ;
  jobInput.textContent = pageJob.textContent;
})

popupEditCloseButton.addEventListener('click', () => {
  closePopup(popupEdit);
});

popupEditForm.addEventListener('submit', submitEditProfileForm);

popupAddOpenButton.addEventListener('click', () => {
  openPopup(popupAdd);
});

popupAddCloseButton.addEventListener('click', () => {
  closePopup(popupAdd);
});

popupAddForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const cardData = {
    link: urlInput.value,
    name: placeInput.value
  } 

  elementsList.prepend(new Card(cardData, '#elements-template').generateCard());

  popupAddForm.reset();
  popupAddSubmitButton.classList.add('popup__button_disabled');
  popupAddSubmitButton.setAttribute('disabled', 'disabled');

  closePopup(popupAdd);
})

buttonCloseImagePopup.addEventListener('click', () => {
  closePopup(popupImage);
});

formsList.forEach(el => {
  const form = new FormValidator(validationConfig, el)
  form.enableValidation();
})

export { openPopup, popupImageImg, popupImageText, popupImage };