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
    }

    @action
    setFirebaseUserInfo(user: any) {
        this.firebaseUserInfo = user;
    }

    onStateChanged() {
        this.firebase.addOrUpdateValue(`${this.firebaseUserInfo.uid}`, this.userInfo);
    }
}

const userInfoState = new UserInfoState();

reaction(
    () => Object.values(userInfoState.userInfo),
    userInfoState.onStateChanged.bind(userInfoState));

export default userInfoState;
