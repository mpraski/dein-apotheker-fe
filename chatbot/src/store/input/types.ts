export interface Option {
    id: string;
    content: string;
}

export interface InputBegin {
    type: 'begin';
}

export interface InputSingle {
    type: 'single';
    options: ReadonlyArray<Option>;
}

export interface InputMultiple {
    type: 'multiple';
    options: ReadonlyArray<Option>;
}

export interface InputPrompt {
    type: 'prompt';
}

export interface InputEnd {
    type: 'end';
}

export type Input = InputBegin | InputSingle | InputMultiple | InputPrompt | InputEnd;

export interface InputState {
    show: boolean;
    input?: Input;
    language?: string;
    languages?: ReadonlyArray<string>;
}

// Keys
export enum Mutations {
    showInput = 'showInput',
    hideInput = 'hideInput'
}

export enum Actions {
    showInput = 'showInput',
    hideInput = 'hideInput'
}

export enum Getters {
    input = 'input',
    showInput = 'showInput',
}
