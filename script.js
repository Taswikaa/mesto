const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__button_purpose_close')


popupOpenButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');
})

popupCloseButton.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
})