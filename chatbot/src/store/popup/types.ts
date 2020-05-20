import { MessageProduct } from '../message/types'

type Partial<T> = {
    [P in keyof T]?: T[P];
}

type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
}

export interface PopupData {
    product: MessageProduct;
    cart: object;
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
