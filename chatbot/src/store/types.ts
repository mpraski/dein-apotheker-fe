export interface RootState {
    version: string;
}

// Helpers
export type ValueOf<T> = T[keyof T];
