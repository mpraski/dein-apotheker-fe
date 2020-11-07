export type ScreenSize = 'small' | 'medium' | 'large'

export interface RootState {
    token?: string;
    screen: ScreenSize;
}

// Keys
export enum Mutations {
    requestSession = 'requestSession',
    receiveSession = 'receiveSession',
    setToken = 'setToken',
    setScreen = 'setScreen'
}

export enum Actions {
    requestSession = 'requestSession',
    receiveSession = 'receiveSession',
    setToken = 'setToken',
    computeScreen = 'computeScreen'
}

// Helpers
export type ValueOf<T> = T[keyof T];

export const defaultWith = <T>(base: () => T) => (state: Partial<T> = {}) => Object.assign(base(), state) as T

export const computeScreenSize: () => ScreenSize = () => {
    const w = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth

    if (w <= 480) {
        return 'small'
    }

    if (w <= 767) {
        return 'medium'
    }

    return 'large'
}

export const emptyState = defaultWith<RootState>(() => ({
    screen: 'medium'
}))
