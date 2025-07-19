import '../pages/index.css';
import { addCard, deleteCard, likeCard } from './card.js';
import { openModal, closeModal, setModalCloseListeners } from './modal.js';
import { clearValidation, enableValidation } from './validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, addNewCard, updateAvatar } from './api.js';

const cardTemplate = document.querySelector("#card-template").content;
const cardContainer = document.querySelector(".places__list");
const editProfile = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const editProfileForm = document.querySelector(".popup_type_edit .popup__form");
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const jobInput = editProfileForm.querySelector(".popup__input_type_description");
const addButton = document.querySelector(".profile__add-button");
const popups = document.querySelectorAll(".popup");
const addPopup = document.querySelector(".popup_type_new-card");
const placePopup = document.querySelector(".popup_type_image");
const photoPlacePopup = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newCardForm = document.forms['new-place'];
const formPopupAvatar = document.forms['avatar-edit'];
const newCardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const newCardUrlInput = newCardForm.querySelector('.popup__input_type_url');
const avatarForProfile = document.querySelector('.popup__input_type_avatar-url');
const profileImage = document.querySelector('.profile__image');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

// Анимация и закрытие попапов
popups.forEach(evt => {
  if(!evt.classList.contains('popup_is-animated')) {
    evt.classList.add('popup_is-animated');
  };
  setModalCloseListeners(evt); 
});

// Открытие изображения
function handleImageClick(cardName, cardLink) {
  photoPlacePopup.src = cardLink;
  photoPlacePopup.alt = `На фото ${cardName}`;
  popupImageCaption.textContent = cardName;
  openModal(placePopup);
};

// Состояние загрузки
function renderLoading(isLoading) {
  const loadingButton = document.querySelector('.popup_is-opened .popup__button');
  if(loadingButton) {
    loadingButton.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
  }
};

// Отображение профиля
function addProfile(user) {
  profileName.textContent = user.name;
  profileDescription.textContent = user.about;
  profileImage.style.backgroundImage = `url(${user.avatar})`;
}

// Отображение карточек
function addCards(cards, userId) {
  cards.forEach((card) => {
    const cardElement = addCard(card, deleteCard, likeCard, handleImageClick, userId);
    cardContainer.append(cardElement); 
  });
};

// Загрузка данных пользователя и карточек с сервера
Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    addProfile(user);
    addCards(cards, user._id);
  })
  .catch((err) => console.log(err));

// Редактирование профиля  
function editProfileData() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editPopup, validationConfig);
  openModal(editPopup);
};

editProfile.addEventListener("click", editProfileData);

// Обновление профиля
function handleUserFormSubmit (evt) {
  evt.preventDefault();
  renderLoading(true);
  updateUserInfo(nameInput.value, jobInput.value)
    .then((user) => {
      addProfile(user);
      closeModal(editPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false);
    });
}
editProfileForm.addEventListener("submit", handleUserFormSubmit);

// Открытие добавления карточки
addButton.addEventListener("click", () => {
  newCardForm.reset();
  clearValidation(addPopup, validationConfig);
  openModal(addPopup);
});

// Добавление новой карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);
  addNewCard(newCardNameInput.value, newCardUrlInput.value)
    .then((newCard) => {
      const cardElement = addCard(newCard, deleteCard, likeCard, handleImageClick, newCard.owner._id);
      cardContainer.prepend(cardElement);
      newCardForm.reset();
      closeModal(addPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false);
    });
}

newCardForm.addEventListener("submit", handleCardFormSubmit);

// Открытие попапа для изменения аватара
profileImage.addEventListener('click', () => {
  formPopupAvatar.reset();
  clearValidation(formPopupAvatar, validationConfig);
  openModal(formPopupAvatar.closest('.popup'));
});

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);
  updateAvatar(avatarForProfile.value)
    .then((user) => {
      profileImage.style.backgroundImage = `url(${user.avatar})`;
      closeModal(formPopupAvatar.closest('.popup'));
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false);
    });
}
formPopupAvatar.addEventListener('submit', handleAvatarFormSubmit);

enableValidation(validationConfig);



