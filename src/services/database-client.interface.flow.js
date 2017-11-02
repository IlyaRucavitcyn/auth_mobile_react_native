/**@flow */
export interface DatabaseClient {
    initialize(config: FirebaseConfigType): void,
}

export type FirebaseConfigType = {
    apiKey: string,
    authDomain: string,
    databaseURL: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string
}

export type DatabaseEntityType = {
    email: string,
    firstName: string,
    lastName: string,
    age: number
}
