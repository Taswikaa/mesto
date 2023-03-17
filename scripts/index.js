import { initialCards, validationConfig } from "./data.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

const elementsList = document.querySelector('.elements__wrapper');

const createCard = function(data) {
  return new Card(data, '#elements-template', handleCardClick);
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);

    cardList.addItem(card.generateCard());
  },
},
elementsList
);

const popupEditSelector = document.querySelector('.popup_edit');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupEditForm = popupEditSelector.querySelector('.popup__form');
const nameInput = popupEditSelector.querySelector('.popup__input_pupose_name');
const jobInput = popupEditSelector.querySelector('.popup__input_pupose_job');
const pageName = document.querySelector('.profile__name');
const pageJob = document.querySelector('.profile__job');

const popupEdit = new PopupWithForm(popupEditSelector, (evt) => {
  evt.preventDefault();

  const formName = nameInput.value;
  const formJob = jobInput.value;
  
  pageName.textContent = formName;
  pageJob.textContent = formJob;
  
  popupEdit.close();
});
popupEdit.setEventListeners();

popupEditOpenButton.addEventListener('click', () => {
  popupEdit.open();
})

const popupAddSelector = document.querySelector('.popup_add');

const popupAddForm = popupAddSelector.querySelector('.popup__form');
const popupAddOpenButton = document.querySelector('.profile__add-button');;
const placeInput = popupAddSelector.querySelector('.popup__input_pupose_place');
const urlInput = popupAddSelector.querySelector('.popup__input_pupose_url');

const popupAdd = new PopupWithForm(popupAddSelector, (evt) => {
  evt.preventDefault();

  const cardData = {
    link: urlInput.value,
    name: placeInput.value
  } 

  elementsList.prepend(createCard(cardData).generateCard());

    popupAddForm.reset();
  validatorAddForm.disableSubmitButton();


  popupAdd.close();
});
popupAdd.setEventListeners();

const popupImageSelector = document.querySelector('.popup_image');

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

const popupImageImg = popupImageSelector.querySelector('.popup__img');
const popupImageText = popupImageSelector.querySelector('.popup__text');

const closePopupButtons = Array.from(document.querySelectorAll('.popup__button_purpose_close'))

const popupList = Array.from(document.querySelectorAll('.popup'));

const validatorAddForm = new FormValidator(validationConfig, popupAddForm);

const validatorEditForm = new FormValidator(validationConfig, popupEditForm);

const validatorFormList = [validatorAddForm, validatorEditForm];

// const closePopupByOuterClick = function(evt, popup) {
//   if (evt.target.classList.contains('popup')) {
//     closePopup(popup);
//   }
// }

// popupList.forEach(popup => {
//   popup.addEventListener('click', evt => {
//     closePopupByOuterClick(evt, popup);
//   })
// })

// const closePopupByPressEnter = function(evt) {
//   if (evt.key === 'Escape') {
//     closePopup(document.querySelector('.popup_opened'));
//   }
// }

// const openPopup = function(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupByPressEnter);
// }

// const closePopup = function(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupByPressEnter);
// }

// closePopupButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     closePopup(button.closest('.popup'))
//   })
// })

// const submitEditProfileForm = function(e) {
//   e.preventDefault();

//   const formName = nameInput.value;
//   const formJob = jobInput.value;
  
//   pageName.textContent = formName;
//   pageJob.textContent = formJob;
//   closePopup(popupEditSelector);
// }

// const handleCardClick = function(name, link) {
//   popupImageImg.src = link;
//   popupImageText.textContent = name;
//   popupImageImg.alt = name;
//   popupImage.open();
// }

const handleCardClick = function(name, link) {
  popupImage.open(name, link);
}

cardList.renderItems();

validatorFormList.forEach(validator => {
  validator.enableValidation();
})

// initialCards.forEach(el => {
//   elementsList.append(createCard(el).generateCard());
// })

// popupEditOpenButton.addEventListener('click', function() {
//   openPopup(popupEditSelector);
//   nameInput.value = pageName.textContent;
//   jobInput.value = pageJob.textContent;

//   validatorEditForm.resetValidation();
// })

// popupEditForm.addEventListener('submit', submitEditProfileForm);

popupAddOpenButton.addEventListener('click', () => {
  popupAdd.open();
});

// popupAddForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const cardData = {
//     link: urlInput.value,
//     name: placeInput.value
//   } 

//   elementsList.prepend(createCard(cardData).generateCard());

//   popupAddForm.reset();
//   validatorAddForm.disableSubmitButton();


//   popupAdd.close();
// })