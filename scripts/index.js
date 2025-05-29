const cardTemplate = document.querySelector("#card-template").content;
const cardContainer = document.querySelector(".places__list");

function addCard(card, deleteCard) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  return cardElement;
}

function deleteCard(card) {
  card.remove();
}

initialCards.forEach(function (card) {
  cardContainer.append(addCard(card, deleteCard));
});
