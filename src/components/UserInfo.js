export class UserInfo {

    constructor ({ userTitle, userSubtitle }) {
        this._userTitle = document.querySelector(userTitle);
        this._userSubtitle = document.querySelector(userSubtitle);
    }

    getUserInfo () {
        const userData = {
            userName: this._userTitle.textContent,
            userJob: this._userSubtitle.textContent
        }

        return userData;
    }

    setUserInfo (userData) {
        this._userTitle.textContent = userData.userName;
        this._userSubtitle.textContent = userData.userJob;
    }
}