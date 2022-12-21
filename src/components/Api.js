class Api {
    constructor({ baseUrl, headers}) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    getProfile () {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
        .catch(console.log)
    }

    getInitialCards () {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
        .catch(console.log)
    }

    editProfile (name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
              })
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
        .catch(console.log)
    }

    addImage (name, link, likes) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link,
                likes
              })
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
        .catch(console.log)
    }
  
    // другие методы работы с API
}

  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
    headers: {
      authorization: '1964c9fe-86a7-460a-b318-7e558d91efb6',
      'Content-Type': 'application/json'
    }
  });