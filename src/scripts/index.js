import '../pages/index.css';
import { initialCards } from './cards.js';
import { addCard, deleteCard, likeCard } from './card.js';
import { openModal, closeModal, setModalCloseListeners } from './modal.js';

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
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newCardForm = document.forms['new-place'];

popups.forEach(evt => {
  if(!evt.classList.contains('popup_is-animated')) {
    evt.classList.add('popup_is-animated');
  };
  setModalCloseListeners(evt); 
});

initialCards.forEach((item) => {
  const cardElement = addCard(item, deleteCard, likeCard, handleImageClick, cardTemplate);
  cardContainer.append(cardElement);
})


function handleImageClick(item) {
  popupImage.src = item.link;
  popupImage.alt = `На фото ${item.name}`;
  popupImageCaption.textContent = item.name;
  openModal(placePopup);
}

function editProfileData() {
  openModal(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

editProfile.addEventListener("click", editProfileData);

function handleUserFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editPopup);
}
editProfileForm.addEventListener("submit", handleUserFormSubmit);

addButton.addEventListener("click", () => {
  openModal(addPopup);
  newCardForm.reset();
}
);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: newCardForm.elements['place-name'].value,
    link: newCardForm.elements['link'].value
  };
  const cardElement = addCard(newCard, deleteCard, likeCard, handleImageClick, cardTemplate);
  cardContainer.prepend(cardElement);
  closeModal(addPopup);
}

newCardForm.addEventListener("submit", handleCardFormSubmit);

