/** @flow */
import firebase from "firebase";
import type { 
    DatabaseClient,
        FirebaseConfigType,
        DatabaseEntityUserInfoType,
        DatabaseEntityUserAppointmentsType,
        UserAppointmentType
} from "./database-client.interface.flow";

export default class FirebaseClient implements DatabaseClient {

    // Implementing static methods for making class singleton
    static client: DatabaseClient;
    static getClient(): DatabaseClient {
        return FirebaseClient.client
            ? FirebaseClient.client
            : FirebaseClient.client = new FirebaseClient();
    }

    initialize(config: FirebaseConfigType): void {
        firebase.initializeApp(config);
    }

    auth(): Promise<any> {
        return firebase.auth();
    }
    addOrUpdateValue(link: string, data: (DatabaseEntityUserInfoType | DatabaseEntityUserAppointmentsType)): Promise<any> {
        return firebase.database().ref(link).update(data);
    }
    pushValue(link: string, data: UserAppointmentType): Promise<any> {
        return firebase.database().ref(link).push(data);
    }
    getData(link: string): Promise<any> {
        return firebase.database().ref(link).once('value')
            .then(snapshot => snapshot.val())
    }
}