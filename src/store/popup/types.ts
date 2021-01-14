import { AnswerValue, Cart, Popup, Row } from '../chat/types'
import { defaultWith } from '../types'

type Partial<T> = {
    [P in keyof T]?: T[P];
}

export interface PopupData {
    cart: Cart;
    chooser: [Row[], (a: AnswerValue) => void];
    question: Popup;
}

export type PopupState = Partial<PopupData>

export type PopupKey = keyof PopupData

// Keys
export enum Mutations {
    showPopup = 'showPopup',
    hidePopup = 'hidePopup',
    clear = 'clear'
}

export enum Actions {
    showPopup = 'showPopup',
    hidePopup = 'hidePopup',
    clear = 'clear'
}

export enum Getters { }

export const emptyState = defaultWith<PopupState>(() => ({}))
