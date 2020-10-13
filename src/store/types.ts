export type Token = string;

export interface RootState {
    token?: Token;
}

// Keys
export enum Mutations {
    provideToken = 'provideToken',
}

export enum Actions {
    provideToken = 'provideToken',
}

// Helpers
export type ValueOf<T> = T[keyof T];
