export type Alignment = 'LEFT' | 'RIGHT';

export interface MessageText {
    type: 'MESSAGE_TEXT';
    content: string;
}

export interface MessageImage {
    type: 'MESSAGE_IMAGE';
    image: string;
    alt: string;
}

export type Message = MessageText | MessageImage;

export type MessageState = Array<[Message, Alignment, string]>;

// Keys
export enum Mutations {
    receiveMessage = 'receiveMessage',
    rewind = 'rewind'
}

export enum Actions {
    receiveMessage = 'receiveMessage',
    rewind = 'rewind'
}
