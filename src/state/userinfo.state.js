/**@flow */
import { observable, action, reaction } from 'mobx';
import FirebaseClient from '../services/firebase-client';

class UserInfoState {
    firebase = FirebaseClient.getClient();

    @observable
    firebaseUserInfo: any = null;

    @observable
    userInfo: any = {
        firstName: '',
        lastName: '',
        age: null
    }

    @action
    setNewUserInfo({ firstName, lastName, age }: any) {
        this.userInfo.firstName = firstName;
        this.userInfo.lastName = lastName;
        this.userInfo.age = age;

        reaction(
            () => Object.values(this.userInfo),
            this.onUserInfoChanged.bind(this));
    }

    @action
    setFirebaseUserInfo(user: any) {
        this.firebaseUserInfo = user;
    }

    onUserInfoChanged() {
        this.firebase.addOrUpdateValue(`${this.firebaseUserInfo.uid}`, this.userInfo);
    }
}

export default new UserInfoState();
