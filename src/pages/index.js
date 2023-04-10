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
    api.getUserInfo().then(data => {
      pageAvatar.src = data.avatar;
      validatorChangeForm.disableSubmitButton();
      popupUpdateAvatar.close();
    })
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

const popupEditProfile = new PopupWithForm(popupEditSelector, (evt, inputValues) => {
  evt.preventDefault();

  renderLoading(popupEditSelector, true, 'Сохранение...', 'Сохранить');

  const formData = new UserInfo({name: inputValues.nick, job: inputValues.job}, pageName, pageJob);

  api.editUserInfo(formData.getUserInfo().name, formData.getUserInfo().job)
  .then(data => {
    formData.setUserInfo(data.name, data.about);
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

getUserInfo
.then(data => {
  const userData = new UserInfo({ name: data.name, job: data.about }, pageName, pageJob);
  userData.setUserInfo(data.name, data.about)
  nameInput.defaultValue = data.name;
  jobInput.defaultValue = data.about;
  pageAvatar.src = data.avatar;
})
.catch((err) => {
  console.log(`Ошибка: ${err}, данные о профиле не загружены`);
})

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

    const dataArray = [cardData];
    console.log(dataArray);

    const newCard = new Section({
      items: dataArray,
      renderer: (item) => {
        newCard.addItem(createCard(item, true).generateCard(false))
      }
    }, elementsList)

    newCard.renderItems();

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
  getInitialCards
   .then(data => {
   
     const cardList = new Section({
       items: data,
       renderer: (item) => {
         const card = createCard(item, item.owner._id === res[0]._id ? true : false);
       
         card.isLiked = item.likes.some(el => el._id === res[0]._id) ? true : false;
       
         cardList.addItemReverse(card.generateCard(card.isLiked));
       },
     },
     elementsList,
     );
   
     cardList.renderItems();
   })
   .catch((err) => {
     console.log(`Ошибка: ${err}, карточки не загружены`);
   })
})