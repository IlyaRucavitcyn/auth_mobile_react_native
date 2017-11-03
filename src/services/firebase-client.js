/** @flow */
import firebase from "firebase";
import type { 
    DatabaseClient,
        FirebaseConfigType,
        DatabaseEntityType
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
    addOrUpdateValue(link: string, data: DatabaseEntityType): void {
        firebase.database().ref(link).update(data);
    }
}