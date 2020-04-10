export type Alignment = 'LEFT' | 'RIGHT';

export interface MessageText {
    type: 'MESSAGE_TEXT';
    alignment: Alignment;
    content: string;
}

export interface MessageImage {
    type: 'MESSAGE_IMAGE';
    alignment: Alignment;
    image: string;
    alt: string;
}

export type Message = MessageText | MessageImage;

export type MessageState = Array<Message>;

// Keys
export enum Mutations {
    receiveMessage = 'receiveMessage',
}

export enum Actions {
    receiveMessage = 'receiveMessage',
}
