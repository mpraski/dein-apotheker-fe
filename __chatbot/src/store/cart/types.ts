export interface Product {
    id: string;
    name: string;
}

export type CartState = Array<[Product, number]>;

// Keys
export enum Mutations {
    add = 'add',
    remove = 'remove'
}

export enum Actions {
    add = 'add',
    remove = 'remove'
}

export enum Getters {
    itemCount = 'itemCount'
}
