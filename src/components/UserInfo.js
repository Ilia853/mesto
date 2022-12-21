export class UserInfo {

    constructor ({ userTitle, userSubtitle }) {
        this._userTitle = document.querySelector(userTitle);
        this._userSubtitle = document.querySelector(userSubtitle);
    }

    getUserInfo () {
        const userData = {
            name: this._userTitle.textContent,
            about: this._userSubtitle.textContent
        }

        return userData;
    }

    setUserInfo (userData) {
        this._userTitle.textContent = userData.name;
        this._userSubtitle.textContent = userData.about;
    }
}