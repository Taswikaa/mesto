import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { validationConfig, elementsList, popupEditSelector, popupEditOpenButton, popupEditSubmitButton, popupEditForm, nameInput, jobInput, pageName, pageJob, pageAvatar, popupAddSelector, popupAddForm, popupAddOpenButton, placeInput, urlInput, popupImageSelector, popupDeleteSelector, popupDeleteForm, popupChangeSelector, profileAvatar, popupChangeForm } from "../utils/constans.js";
import './index.css';
import Popup from "../components/Popup.js";

const popupDelete = new PopupWithForm(popupDeleteSelector, (evt) => {
  evt.preventDefault();

  api.deleteCard(popupDelete.cardId)
  .then(() => {
    popupDelete.Card.remove();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}, не удалось удалить карточку`);
  });
  
  popupDelete.close();
});

popupDelete.setEventListeners();

const popupChange = new PopupWithForm(popupChangeSelector, (evt) => {
  evt.preventDefault();

  popupChangeSelector.querySelector('.popup__button_purpose_submit').textContent = 'Сохранение...'

  api.changeAvatar(popupChange.inputValues['url-avatar'])
  .then(() => {
    api.getUserInfo().then(data => {
      pageAvatar.src = data.avatar;
    })
  })
  .catch(err => {
    console.log(`Ошибка: ${err}, не удалось изменить аватар`);
  })
  .finally(() => {
    popupChangeSelector.querySelector('.popup__button_purpose_submit').textContent = 'Сохраненить'
  });

  validatorChangeForm.disableSubmitButton();

  popupChange.close();
})

popupChange.setEventListeners();

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

api.getUserInfo()
.then(data => {
  pageName.textContent = data.name;
  nameInput.defaultValue = data.name;
  pageJob.textContent = data.about;
  jobInput.defaultValue = data.about;
  pageAvatar.src = data.avatar;
})
.catch((err) => {
  console.log(`Ошибка: ${err}, данные о профиле не загружены`);
})

api.getInitialCards()
.then(data => {
  // data.forEach(el => {
  //   if (el.likes.some(el => {
  //     return el._id === 'e42aced187e502f6152d2af8';
  //   })) {
  //     console.log(el);
  //   }
  // })

  const cardList = new Section({
    items: data,
    renderer: (item) => {
      const card = createCard(item, item.owner._id === 'e42aced187e502f6152d2af8' ? true : false);

      card.isLiked = item.likes.some(el => el._id === 'e42aced187e502f6152d2af8') ? true : false;

      cardList.addItem(card.generateCard(card.isLiked));
    },
  },
  elementsList,
  );

  cardList.renderItems();
})
.catch((err) => {
  console.log(`Ошибка: ${err}, карточки не загружены`);
})

const popupEdit = new PopupWithForm(popupEditSelector, (evt) => {
  evt.preventDefault();

  popupEditSubmitButton.textContent = 'Сохранение...';

  const formData = new UserInfo({name: popupEdit.inputValues.nick, job: popupEdit.inputValues.job}, pageName, pageJob);

  api.editUserInfo(formData.getUserInfo().name, formData.getUserInfo().job)
  .then(data => {
    formData.setUserInfo(data.name, data.about);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}, не удалось изменить данные`);
  })
  .finally(() => {
    popupEditSubmitButton.textContent = 'Сохранить'
  });

  nameInput.defaultValue = popupEdit.inputValues.nick;
  jobInput.defaultValue = popupEdit.inputValues.job;

  popupEdit.close();
});

popupEdit.setEventListeners();

popupEditOpenButton.addEventListener('click', () => {
  popupEdit.open();
})

const popupAdd = new PopupWithForm(popupAddSelector, (evt) => {
  evt.preventDefault();

  popupAddSelector.querySelector('.popup__button_purpose_submit').textContent = 'Сохранение...';

  const cardData = {
    link: popupAdd.inputValues['url-image'],
    name: popupAdd.inputValues.place,
    likes: [],
  } 

  api.addNewCard(cardData.name, cardData.link, cardData.likes)
  .then(data => {
    cardData._id = data._id;

    elementsList.prepend(createCard(cardData, true).generateCard(false));
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}, не удалось загрузить карточку`);
  })
  .finally(() => {
    popupAddSelector.querySelector('.popup__button_purpose_submit').textContent = 'Создать';
  });

  validatorAddForm.disableSubmitButton();

  popupAdd.close();
});

popupAdd.setEventListeners();

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
  popupAdd.open();
});

profileAvatar.addEventListener('click', () => {
  popupChange.open();
});