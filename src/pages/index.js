import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { validationConfig, elementsList, popupEditSelector, popupEditOpenButton, popupEditSubmitButton, popupEditForm, nameInput, jobInput, pageName, pageJob, pageAvatar, popupAddSelector, popupAddForm, popupAddOpenButton, placeInput, urlInput, popupImageSelector, popupDeleteSelector, popupDeleteForm, popupChangeSelector, profileAvatar, popupChangeForm } from "../utils/constans.js";
import './index.css';
import { renderLoading } from "../utils/utils.js"
import Popup from "../components/Popup.js";

const popupDelete = new PopupWithForm(popupDeleteSelector, (evt) => {
  evt.preventDefault();

  renderLoading(popupDeleteSelector, true, 'Удаление...', 'Удалить');

  api.deleteCard(popupDelete.cardId)
  .then(() => {
    popupDelete.Card.remove();
    popupDelete.close();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}, не удалось удалить карточку`);
  })
  .finally(() => {
    renderLoading(popupDeleteSelector, false, 'Удаление...', 'Да');
  });
});

popupDelete.setEventListeners();

const popupUpdateAvatar = new PopupWithForm(popupChangeSelector, (evt, inputValues) => {
  evt.preventDefault();

  renderLoading(popupChangeSelector, true, 'Сохранение...', 'Сохранить');

  api.changeAvatar(inputValues['url-avatar'])
  .then(() => {
    pageAvatar.src = inputValues['url-avatar'];
    validatorChangeForm.disableSubmitButton();
    popupUpdateAvatar.close();
  })
  .catch(err => {
    console.log(`Ошибка: ${err}, не удалось изменить аватар`);
  })
  .finally(() => {
    renderLoading(popupChangeSelector, false, 'Сохранение...', 'Сохранить');
  });
})

popupUpdateAvatar.setEventListeners();

const handleCardClick = function(name, link) {
  popupImage.open(name, link);
}

const handleLikeClick = function() {
  const isLiked = !this._likeButton.classList.contains('elements__favorite_active');
  if (isLiked) {
    api.cancelLike(this._id)
    .then(data => {
      this._element.querySelector('.elements__like-counter').textContent = data.likes.length;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}, не удалось изменить состояние лайка`);
      this._likeButton.classList.toggle('elements__favorite_active')
    });
  } else {
    api.likeCard(this._id)
    .then(data => {
      this._element.querySelector('.elements__like-counter').textContent = data.likes.length;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}, не удалось изменить состояние лайка`);
      this._likeButton.classList.toggle('elements__favorite_active')
    });
  }
}

const createCard = function(data, isOwner) {
  return new Card(data, '#elements-template', handleCardClick, popupDelete, isOwner, handleLikeClick);
}

const api = new Api({
  url: 'https://nomoreparties.co/v1/cohort-63',
  key: '1f54a3c5-b2a8-45c9-9b64-ac21ab4a1c2a'
});

const getInitialCards = api.getInitialCards();

const pageUserInfo = new UserInfo(pageName, pageJob);

const popupEditProfile = new PopupWithForm(popupEditSelector, (evt, inputValues) => {
  evt.preventDefault();

  renderLoading(popupEditSelector, true, 'Сохранение...', 'Сохранить');

  api.editUserInfo(inputValues.nick, inputValues.job)
  .then(data => {
    pageUserInfo.setUserInfo(data.name, data.about);
    popupEditProfile.close();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}, не удалось изменить данные`);
  })
  .finally(() => {
    renderLoading(popupEditSelector, false, 'Сохранение...', 'Сохранить');
  });
});

popupEditProfile.setEventListeners();

popupEditOpenButton.addEventListener('click', () => {
  popupEditProfile.open();

  nameInput.value = pageName.textContent;
  jobInput.value = pageJob.textContent;
})

const getUserInfo = api.getUserInfo();

const cardSection = new Section({ 
  renderer: (item, id) => {

    const card = createCard(item, item.owner._id === id ? true : false);
  
    card.isLiked = item.likes.some(el => el._id === id) ? true : false;
  
    cardSection.addItemReverse(card.generateCard(card.isLiked));
  },}, elementsList);

const popupAddCard = new PopupWithForm(popupAddSelector, (evt, inputValues) => {
  evt.preventDefault();

  renderLoading(popupAddSelector, true, 'Сохранение...', 'Создать');

  const cardData = {
    link: inputValues['url-image'],
    name: inputValues.place,
    likes: [],
  } 

  api.addNewCard(cardData.name, cardData.link, cardData.likes)
  .then(data => {
    cardData._id = data._id;

    cardSection.addItem(createCard(cardData, true).generateCard(false));

    popupAddCard.close();
    validatorAddForm.disableSubmitButton();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}, не удалось загрузить карточку`);
  })
  .finally(() => {
    renderLoading(popupAddSelector, false, 'Сохранение...', 'Создать');
  });
});

popupAddCard.setEventListeners();

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

const validatorAddForm = new FormValidator(validationConfig, popupAddForm);

const validatorEditForm = new FormValidator(validationConfig, popupEditForm);

const validatorChangeForm = new FormValidator(validationConfig, popupChangeForm);

const validatorFormList = [validatorAddForm, validatorEditForm, validatorChangeForm];

validatorFormList.forEach(validator => {
  validator.enableValidation();
})

popupAddOpenButton.addEventListener('click', () => {
  popupAddCard.open();
});

profileAvatar.addEventListener('click', () => {
  popupUpdateAvatar.open();
});

Promise.all([getUserInfo, getInitialCards])
.then(res => {
    pageUserInfo.setUserInfo(res[0].name, res[0].about)
    nameInput.defaultValue = res[0].name;
    jobInput.defaultValue = res[0].about;
    pageAvatar.src = res[0].avatar;

    cardSection.getItems(res[1]);
    cardSection.renderItems(res[0]._id);
})
.catch((err) => {
  console.log(`Ошибка: ${err}, карточки или данные профиля не загружены`);
})