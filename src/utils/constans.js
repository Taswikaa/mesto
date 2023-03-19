export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const validationConfig = {
  formSelector: 'popup__form',
  inputSelector: 'popup__input',
  submitButtonSelector: 'popup__button_purpose_submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__span-error_active'
}

export const elementsList = document.querySelector('.elements__wrapper');

export const popupEditSelector = document.querySelector('.popup_edit');
export const popupEditOpenButton = document.querySelector('.profile__edit-button');
export const popupEditForm = popupEditSelector.querySelector('.popup__form');
export const nameInput = popupEditSelector.querySelector('.popup__input_pupose_name');
export const jobInput = popupEditSelector.querySelector('.popup__input_pupose_job');
export const pageName = document.querySelector('.profile__name');
export const pageJob = document.querySelector('.profile__job');

export const popupAddSelector = document.querySelector('.popup_add');

export const popupAddForm = popupAddSelector.querySelector('.popup__form');
export const popupAddOpenButton = document.querySelector('.profile__add-button');
export const placeInput = popupAddSelector.querySelector('.popup__input_pupose_place');
export const urlInput = popupAddSelector.querySelector('.popup__input_pupose_url');

export const popupImageSelector = document.querySelector('.popup_image');