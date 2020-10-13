export type Alignment = 'LEFT' | 'RIGHT';

export interface MessageText {
    type: 'text';
    content: string;
}

export interface MessageImage {
    type: 'image';
    image: string;
    content: string;
}

export interface MessageProduct {
    type: 'product';
    image: string;
    name: string;
}

export type Message = MessageText | MessageImage | MessageProduct;

export type MessageState = Array<[Message, Alignment]>;

// Keys
export enum Mutations {
    addMessage = 'addMessage',
    clear = 'clear'
}

export enum Actions {
    addMessage = 'addMessage',
    clear = 'clear'
}
