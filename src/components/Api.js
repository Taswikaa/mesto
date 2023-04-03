export default class Api {
  constructor({ url, key }) {
    this._url = url;
    this._key = key;
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._key
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(res.status)
    })
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._key
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(res.status);
    })
  }

  editUserInfo(name, job) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about: job
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(res.status);
    })
  }

  addNewCard(name, link, likes) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link,
        likes
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(res.status);
    })
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._key,
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(res.status);
    })
  }

  likeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._key,
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(res.status);
    })
  }

  cancelLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._key,
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(res.status);
    })
  }

  changeAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(res.status);
    })
  }
} 