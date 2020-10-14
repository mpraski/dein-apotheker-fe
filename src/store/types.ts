export interface RootState {
    token?: string;
}

// Keys
export enum Mutations {
    requestToken = 'requestToken',
    setToken = 'setToken'
}

export enum Actions {
    requestToken = 'requestToken',
    setToken = 'setToken'
}

// Helpers
export type ValueOf<T> = T[keyof T];
