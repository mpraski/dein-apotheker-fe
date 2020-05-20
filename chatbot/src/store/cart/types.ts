export interface Product {
    id: string;
    name: string;
}

export type CartState = Array<[Product, number]>;

// Keys
export enum Mutations {
    addToCart = 'addToCart',
    removeFromCart = 'hidePopup'
}

export enum Actions {
    addToCart = 'addToCart',
    removeFromCart = 'hidePopup'
}

export enum Getters {
    itemCount = 'itemCount'
}
