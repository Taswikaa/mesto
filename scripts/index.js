const popup = document.querySelector('.popup');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__button_purpose_close');
const popupForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_pupose_name');
const jobInput = document.querySelector('.popup__input_pupose_job');
const pageName = document.querySelector('.profile__name');
const pageJob = document.querySelector('.profile__job');

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

// Like

const likeButtons = document.querySelectorAll('.elements__favorite');

const closePopup = function() {
  popup.classList.remove('popup_opened');
}

const openPopup = function() {
  popup.classList.add('popup_opened');
}

const closeAddPopup = function() {
  popupAdd.classList.remove('add-popup_opened');
}

const openAddPopup = function() {
  popupAdd.classList.add('add-popup_opened');
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
  openPopup();
  nameInput.textContent = pageName.textContent ;
  jobInput.textContent = pageJob.textContent;
})

popupCloseButton.addEventListener('click', closePopup);

popupForm.addEventListener('submit', handleFormSubmit);

// New popup

const popupAdd = document.querySelector('.add-popup');
const popupAddForm = document.querySelector('.add-popup__form');
const popupAddButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = document.querySelector('.add-popup__button_purpose_close');
const placeInput = document.querySelector('.add-popup__input_pupose_place');
const urlInput = document.querySelector('.add-popup__input_pupose_url');

const addedCardsLikeButtons = [];

popupAddButton.addEventListener('click', openAddPopup);

popupAddCloseButton.addEventListener('click', closeAddPopup);

popupAddForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const elementsTemplate = document.querySelector('#elements-template');
  const elementsList = document.querySelector('.elements__wrapper');

  const elementsItem = elementsTemplate.content.cloneNode(true);
  elementsItem.querySelector('.elements__image').src = `${urlInput.value}`;
  elementsItem.querySelector('.elements__name').textContent = `${placeInput.value}`;
  addedCardsLikeButtons.push(elementsItem.querySelector('.button'));

  elementsList.prepend(elementsItem);
  urlInput.value = '';
  placeInput.value = '';
  closeAddPopup();

  addedCardsLikeButtons.forEach(el => {
    el.addEventListener('click', () => {
      el.classList.toggle('elements__favorite_active');
      console.log(addedCardsLikeButtons.length);
    })
  })
})

likeButtons.forEach(el => {
  el.addEventListener('click', () => {
    el.classList.toggle('elements__favorite_active');
    console.log(addedCardsLikeButtons.length);
  })
})



