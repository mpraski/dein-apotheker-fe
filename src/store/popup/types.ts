import { Cart } from '../chat/types'
import { defaultWith } from '../types'

type Partial<T> = {
    [P in keyof T]?: T[P];
}

type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
}

export interface PopupData {
    cart: Cart;
}

export type PopupState = Partial<PopupData>

export type PopupKey = keyof PopupData

// Keys
export enum Mutations {
    showPopup = 'showPopup',
    hidePopup = 'hidePopup'
}

export enum Actions {
    showPopup = 'showPopup',
    hidePopup = 'hidePopup'
}

export enum Getters {
}

export const emptyState = defaultWith<PopupState>(() => ({
    cart: undefined
}))
