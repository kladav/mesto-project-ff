const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-42',
  headers: {
    authorization: '44b1d149-b9c4-4c92-a6ca-906c2575c150',
    'Content-Type': 'application/json'
  }
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(checkResponse);
}

export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(checkResponse);
}

export function updateUserInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(checkResponse);
}

export function addNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(checkResponse);
}

export function deleteInitialCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(checkResponse);
}

function addLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(checkResponse);
}

function removeLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(checkResponse);
}

export function toggleLike(cardId, isLiked) {
  if (isLiked) {
    return removeLike(cardId);
  } else {
    return addLike(cardId);
  }
}

export function updateAvatar(avatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
    .then(checkResponse);
} 