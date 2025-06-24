const escapeHandler = (evt) => {if (evt.key === 'Escape') { 
  closeModal(document.querySelector('.popup_is-opened'));
};
};

export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', escapeHandler);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escapeHandler);
}

export function setModalCloseListeners(popup) {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__close') || evt.target === popup) {
      closeModal(popup);
    }
  });
}