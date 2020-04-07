import { Message } from 'question'

export type Alignment = 'LEFT' | 'RIGHT';

export interface ShowMessage {
    type: 'SHOW_MESSAGE';
    message: Message;
    alignment: Alignment;
}

export interface ShowInput {
    type: 'SHOW_INPUT';
}

export interface HideInput {
    type: 'HIDE_INPUT';
}

export type Command = ShowMessage | ShowInput | HideInput;