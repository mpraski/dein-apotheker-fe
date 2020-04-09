import { Option } from './question'

export type Alignment = 'LEFT' | 'RIGHT';

export interface MessageText {
    type: 'MESSAGE_TEXT';
    content: string;
    alignment: Alignment;
}

export interface MessageImage {
    type: 'MESSAGE_IMAGE';
    image: string;
    alignment: Alignment;
}

export interface InputSingle {
    type: 'INPUT_SINGLE';
    options: ReadonlyArray<Option>;
}

export interface InputMultiple {
    type: 'INPUT_MULTIPLE';
    options: ReadonlyArray<Option>;
}

export interface InputPrompt {
    type: 'SHOW_PROMPT';
}

export type Message = MessageText | MessageImage | InputSingle | InputMultiple | InputPrompt;
