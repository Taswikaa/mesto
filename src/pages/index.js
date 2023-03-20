import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, validationConfig, elementsList, popupEditSelector, popupEditOpenButton, popupEditForm, nameInput, jobInput, pageName, pageJob, popupAddSelector, popupAddForm, popupAddOpenButton, placeInput, urlInput, popupImageSelector } from "../utils/constans.js";
import './index.css';

const handleCardClick = function(name, link) {
  popupImage.open(name, link);
}

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

const popupEdit = new PopupWithForm(popupEditSelector, (evt) => {
  evt.preventDefault();

  const formData = new UserInfo({name: popupEdit.inputValues.nick, job: popupEdit.inputValues.job}, pageName, pageJob);

  formData.setUserInfo(formData.getUserInfo().name, formData.getUserInfo().job);

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

  const cardData = {
    link: popupAdd.inputValues['url-image'],
    name: popupAdd.inputValues.place
  } 

  elementsList.prepend(createCard(cardData).generateCard());

  validatorAddForm.disableSubmitButton();

  popupAdd.close();
});

popupAdd.setEventListeners();

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

const validatorAddForm = new FormValidator(validationConfig, popupAddForm);

const validatorEditForm = new FormValidator(validationConfig, popupEditForm);

const validatorFormList = [validatorAddForm, validatorEditForm];

cardList.renderItems();

validatorFormList.forEach(validator => {
  validator.enableValidation();
})

popupAddOpenButton.addEventListener('click', () => {
  popupAdd.open();
});