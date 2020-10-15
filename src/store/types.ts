export interface RootState {
    token?: string;
}

// Keys
export enum Mutations {
    requestSession = 'requestSession',
    receiveSession = 'receiveSession',
    setToken = 'setToken'
}

export enum Actions {
    requestSession = 'requestSession',
    receiveSession = 'receiveSession',
    setToken = 'setToken'
}

// Helpers
export type ValueOf<T> = T[keyof T];
