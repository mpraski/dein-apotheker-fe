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

export const defaultWith = <T>(base: () => T) => (state: Partial<T> = {}) => Object.assign(base(), state) as T

export const emptyState = defaultWith<RootState>(() => ({}))
