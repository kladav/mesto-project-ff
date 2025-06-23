export function addCard(card, deleteCard, likeCard, handleImageClick) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteCardButton = cardElement.querySelector(".card__delete-button");
  const likeCardButton = cardElement.querySelector(".card__like-button");

  cardImage.src = card.link;
  cardTitle.textContent = card.name;
  cardImage.alt = `На фото ${card.name}`;

  cardImage.addEventListener("click", () =>
    handleImageClick(card));
  deleteCardButton.addEventListener("click", deleteCard);
  likeCardButton.addEventListener("click", likeCard);

  return cardElement;
}

export function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}