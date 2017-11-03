/**@flow */
export interface DatabaseClient {
    initialize(config: FirebaseConfigType): void,
    auth(): any,
    addOrUpdateValue(
        link: string,
        data: DatabaseEntityType): void,
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

export type DatabaseEntityType = {
    firstName: string,
    lastName: string,
    age: number
}
