/** @flow */
import firebase from "firebase";
import type { DatabaseClient,
    FirebaseConfigType
} from "./database-client.interface.flow";

export default class FirebaseClient implements DatabaseClient {

    // Implementing static methods for making class singleton
    static client;
    static getClient() {
        return FirebaseClient.client
            ? FirebaseClient.client
            : FirebaseClient.client = new FirebaseClient();
    }

    initialize(config: FirebaseConfigType): void {
        firebase.initializeApp(config);
    }

    auth(){
        return firebase.auth();
    }
}