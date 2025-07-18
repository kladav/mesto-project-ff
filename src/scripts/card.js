import {deleteInitialCard, toggleLike} from './api.js';

const cardTemplate = document.querySelector("#card-template").content;

export function addCard(card, deleteCard, likeCard, handleImageClick, userId) {
  const cardElement = cardTemplate
    .querySelector(".card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteCardButton = cardElement.querySelector(".card__delete-button");
  const likeCardButton = cardElement.querySelector(".card__like-button");
  const likeCardCounter = cardElement.querySelector(".card__like-counter");

  likeCardCounter.textContent = card.likes.length;
  if (card.likes.some(like => like._id === userId)) {
    likeCardButton.classList.add('card__like-button_is-active');
  }

  if (card.owner._id === userId) {
    deleteCardButton.addEventListener("click", () => {
      deleteCard(cardElement, card._id);
    });
  } else {
    deleteCardButton.remove();
  }

  cardImage.src = card.link;
  cardTitle.textContent = card.name;
  cardImage.alt = `На фото ${card.name}`;

  cardImage.addEventListener("click", () =>
    handleImageClick(card.name, card.link)
  );
  likeCardButton.addEventListener("click", (evt) => {
    likeCard(evt, card._id, likeCardCounter);
  });

  return cardElement;
}

export function deleteCard(cardElement, cardId) {
  deleteInitialCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => console.log(err));
}

export function likeCard(evt, cardId, likeCardCounter) {
  toggleLike(cardId, evt.target.classList.contains('card__like-button_is-active'))
    .then((res) => {
  evt.target.classList.toggle('card__like-button_is-active');
  likeCardCounter.textContent = res.likes.length;
    })
    .catch((err) => console.log(err));
}