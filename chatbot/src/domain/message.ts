export type Alignment = 'LEFT' | 'RIGHT';

export interface MessageText {
    type: 'MESSAGE_TEXT';
    content: string;
    alignment: Alignment;
}

export interface MessageImage {
    type: 'MESSAGE_IMAGE';
    image: string;
    alt: string;
    alignment: Alignment;
}

export type Message = MessageText | MessageImage;
