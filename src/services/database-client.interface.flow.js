/**@flow */
export interface DatabaseClient {
    initialize(config: FirebaseConfigType): void,
    auth(): any,
    addOrUpdateValue(
        link: string,
        data: DatabaseEntityUserInfoType | DatabaseEntityUserAppointmentsType): void,
    getData(link: string): Promise<any>
}

export type FirebaseConfigType = {
    apiKey: string,
    authDomain: string,
    databaseURL: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string
}

export type DatabaseEntityUserInfoType = {
    firstName: string,
    lastName: string,
    age: number | null,
}

export type UserAppointmentType = {
    datetime: string,
    staff: string,
};

export type DatabaseEntityUserAppointmentsType = Array<UserAppointmentType>;
