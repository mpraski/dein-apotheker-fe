import { Message, Option } from './question'

export type Alignment = 'LEFT' | 'RIGHT';

export interface ShowMessage {
    type: 'SHOW_MESSAGE';
    message: Message;
    alignment: Alignment;
}

export interface ShowSingle {
    type: 'SHOW_SINGLE';
    options: ReadonlyArray<Option>;
}

export interface ShowMultiple {
    type: 'SHOW_MULTIPLE';
    options: ReadonlyArray<Option>;
}

export interface ShowPrompt {
    type: 'SHOW_PROMPT';
}

export type Command = ShowMessage | ShowSingle | ShowMultiple | ShowPrompt;
