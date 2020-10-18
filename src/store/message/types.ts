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

export interface MessageData {
    alignment: Alignment;
    when: number;
};

export type MessageState = Array<[Message, MessageData]>;

// Keys
export enum Mutations {
    addMessage = 'addMessage',
    clear = 'clear'
}

export enum Actions {
    addMessage = 'addMessage',
    clear = 'clear'
}
