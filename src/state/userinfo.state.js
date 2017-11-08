/**@flow */
import { observable, action, reaction } from 'mobx';
import FirebaseClient from '../services/firebase-client';
import type { 
    DatabaseEntityUserInfoType,
        DatabaseEntityUserAppointmentsType,
        UserAppointmentType
} from "../services/database-client.interface.flow";

class UserInfoState {
    firebase = FirebaseClient.getClient();

    @observable
    firebaseUserInfo: any = null;

    @observable
    userInfo: DatabaseEntityUserInfoType = {
        firstName: '',
        lastName: '',
        age: null,
    }

    @observable
    staffAvailable: [] = [];

    @observable
    userAppointments: DatabaseEntityUserAppointmentsType = [];

    @action
    setNewUserInfo({ firstName, lastName, age, staffAvailable }: any) {
        this.userInfo.firstName = firstName;
        this.userInfo.lastName = lastName;
        this.userInfo.age = age;
        if (staffAvailable) {
            this.staffAvailable = staffAvailable;
        }
    }

    @action
    setUserAppointments(data: { [id: string]: UserAppointmentType }) {
        this.userAppointments = Object.values(data);
    }

    @action
    addAppointment(newAppointment: any) {
        this.userAppointments.push(newAppointment)
    }

    @action
    setFirebaseUserInfo(user: any) {
        this.firebaseUserInfo = user;
    }

    onUserInfoChanged() {
        this.firebase.addOrUpdateValue(`${this.firebaseUserInfo.uid}`, this.userInfo);
    }

    onUserAppointmentsChanged() {
        this.firebase.pushValue(
            `${this.firebaseUserInfo.uid}/appointments`,
            this.userAppointments[this.userAppointments.length - 1]);
    }

    setReactions() {
        reaction(
            () => Object.values(this.userInfo),
            this.onUserInfoChanged.bind(this));

        reaction(
            () => this.userAppointments.length,
            this.onUserAppointmentsChanged.bind(this));
    }
}

const userInfoState = new UserInfoState();

// reaction(
//     () => Object.values(userInfoState.userInfo),
//     userInfoState.onUserInfoChanged.bind(userInfoState));

// reaction(
//     () => userInfoState.userAppointments.length,
//     userInfoState.onUserAppointmentsChanged.bind(userInfoState));

export default userInfoState;
