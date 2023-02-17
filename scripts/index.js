const elementsList = document.querySelector('.elements__wrapper');

const addCard = function(src, name) {
  const elementsTemplate = document.querySelector('#elements-template');
  const elementsItem = elementsTemplate.content.cloneNode(true);

  elementsItem.querySelector('.elements__image').src = src;
  elementsItem.querySelector('.elements__name').textContent = name;

  const likeBtn = elementsItem.querySelector('.elements__favorite');
  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('elements__favorite_active');
  })

  const deleteBtn = elementsItem.querySelector('.elements__delete-icon');
  deleteBtn.addEventListener('click', () => {
    deleteBtn.closest('.elements__item').remove();
  })

  const image = elementsItem.querySelector('.elements__image');
  image.addEventListener('click', () => {
    popupImageImg.src = src;
    popupImageText.textContent = name;
    openPopup(popupImage);
  })

  return elementsItem;
}

initialCards.forEach(el => {
  elementsList.append(addCard(el.link, el.name));
})

// Open/Close popups

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

// popupEdit

const popupEdit = document.querySelector('.popup_edit');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupEditCloseButton = popupEdit.querySelector('.popup__button_purpose_close');
const popupEditForm = popupEdit.querySelector('.popup__form');
const nameInput = popupEdit.querySelector('.popup__input_pupose_name');
const jobInput = popupEdit.querySelector('.popup__input_pupose_job');
const pageName = document.querySelector('.profile__name');
const pageJob = document.querySelector('.profile__job');

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

// popupAdd

const popupAdd = document.querySelector('.popup_add');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = popupAdd.querySelector('.popup__button_purpose_close');
const popupAddSubmitButton = popupAdd.querySelector('.popup__button_purpose_submit');
const placeInput = popupAdd.querySelector('.popup__input_pupose_place');
const urlInput = popupAdd.querySelector('.popup__input_pupose_url');

popupAddOpenButton.addEventListener('click', () => {
  openPopup(popupAdd);
});

popupAddCloseButton.addEventListener('click', () => {
  closePopup(popupAdd);
});

popupAddForm.addEventListener('submit', (e) => {
  e.preventDefault();

  elementsList.prepend(addCard(urlInput.value, placeInput.value));
  popupAddForm.reset();
  popupAddSubmitButton.classList.add('popup__button_disabled');
  popupAddSubmitButton.setAttribute('disabled', 'disabled');

  closePopup(popupAdd);
})

// popupImage

const popupImage = document.querySelector('.popup_image');
const popupImageImg = popupImage.querySelector('.popup__img');
const popupImageText = popupImage.querySelector('.popup__text');
const buttonCloseImagePopup = popupImage.querySelector('.popup__button_purpose_close');

buttonCloseImagePopup.addEventListener('click', () => {
  closePopup(popupImage);
});

// popup close by click and esc

const popupList = Array.from(document.querySelectorAll('.popup'));

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