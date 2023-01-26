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
  nameInput.textContent = pageName.textContent ;
  jobInput.textContent = pageJob.textContent;
})

popupCloseButton.addEventListener('click', closePopup);

popupForm.addEventListener('submit', handleFormSubmit);

// Elements

const initialCards = [
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

initialCards.forEach(el => {
  const elementsTemplate = document.querySelector('#elements-template');
  const elementsList = document.querySelector('.elements__wrapper');

  const elementsItem = elementsTemplate.content.cloneNode(true);
  elementsItem.querySelector('.elements__image').src = `${el.link}`;
  elementsItem.querySelector('.elements__name').textContent = `${el.name}`;

  elementsList.append(elementsItem);
})