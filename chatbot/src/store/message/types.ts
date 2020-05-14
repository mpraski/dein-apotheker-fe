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

export interface MessageBuy {
    type: 'buy';
    image: string;
    name: string;
    price: string;
}

export type Message = MessageText | MessageImage | MessageBuy;

export type MessageState = Array<[Message, Alignment]>;

// Keys
export enum Mutations {
    receiveMessage = 'receiveMessage',
    rewind = 'rewind'
}

export enum Actions {
    receiveMessage = 'receiveMessage',
    rewind = 'rewind'
}
