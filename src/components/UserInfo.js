export class UserInfo {

    constructor ({ userTitle, userSubtitle, userAvatar }) {
        this._userTitle = document.querySelector(userTitle);
        this._userSubtitle = document.querySelector(userSubtitle);
        this._userAvatar = document.querySelector(userAvatar);
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
        this._userAvatar.src = userData.avatar;
    }
}